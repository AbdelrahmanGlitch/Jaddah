"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpRight, Globe, Menu, X } from "lucide-react";
import { Logo } from "./Logo";
import { useLang } from "@/lib/i18n";
import { cn } from "@/lib/cn";
import { company, chatLink } from "@/data/company";
import { FacebookIcon } from "@/components/ui/BrandIcons";
import { ChatIcon } from "@/components/ui/ChatIcon";

export function Navbar() {
  const { t, toggleLang, lang } = useLang();
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Lock page scroll behind the mobile menu
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const links = [
    { href: "/", label: t.nav.home },
    { href: "/trips", label: t.nav.trips },
    { href: "/#destinations", label: t.nav.destinations },
    { href: "/#about", label: t.nav.about },
    { href: "/#why-us", label: t.nav.whyUs },
    { href: "/#faq", label: t.nav.faq },
    { href: "/#contact", label: t.nav.contact },
  ];

  const isActive = (href: string) => (href === "/" ? pathname === "/" : !href.includes("#") && pathname.startsWith(href));
  const solid = scrolled && !open;

  return (
    <>
      <header
        className={cn(
          "fixed inset-x-0 top-0 z-50 transition-all duration-500 ease-(--ease-premium)",
          solid ? "border-b border-navy-900/5 bg-white/85 py-3 shadow-[0_8px_30px_-20px_rgba(11,31,51,0.35)] backdrop-blur-xl" : "bg-transparent py-5",
        )}
      >
        {!solid && <div className="pointer-events-none absolute inset-0 -z-10 bg-linear-to-b from-navy-950/50 to-transparent" />}
        <div className="container-x flex items-center justify-between gap-6">
          <Logo tone={solid ? "dark" : "light"} />

          <nav className="hidden items-center gap-1 xl:flex" aria-label="Main">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "relative px-3.5 py-2 text-[13.5px] font-medium transition-colors duration-300",
                  solid ? "text-ink/70 hover:text-navy-900" : "text-white/80 hover:text-white",
                  isActive(link.href) && (solid ? "text-navy-900" : "text-white"),
                )}
              >
                {link.label}
                {isActive(link.href) && <span className="absolute inset-x-3.5 -bottom-0.5 h-px bg-gold" />}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={toggleLang}
              aria-label={t.lang.label}
              className={cn(
                "flex items-center gap-2 rounded-full px-3.5 py-2 text-[13px] font-semibold transition-colors",
                solid ? "text-navy-900 hover:bg-navy-900/5" : "text-white hover:bg-white/10",
              )}
            >
              <Globe className="size-4" strokeWidth={1.6} />
              <span className={lang === "en" ? "font-arabic" : ""}>{t.lang.switchTo}</span>
            </button>
            <Link href="/trips" className={cn("btn hidden py-3 md:inline-flex", "btn-primary")}>
              {t.nav.cta}
            </Link>
            <button
              type="button"
              onClick={() => setOpen((o) => !o)}
              aria-label={open ? t.nav.close : t.nav.menu}
              aria-expanded={open}
              className={cn(
                "grid size-11 place-items-center rounded-full border transition-colors xl:hidden",
                solid ? "border-navy-900/10 text-navy-900" : "border-white/30 text-white",
              )}
            >
              {open ? <X className="size-5" strokeWidth={1.6} /> : <Menu className="size-5" strokeWidth={1.6} />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile / tablet full-screen menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            key="mobile-menu"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35 }}
            className="grain fixed inset-0 z-40 flex flex-col overflow-y-auto bg-navy-950 px-6 pt-28 pb-10 xl:hidden"
          >
            <nav className="flex flex-col" aria-label="Mobile">
              {links.map((link, i) => (
                <motion.div
                  key={link.href}
                  initial={{ opacity: 0, y: 24 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.05 + i * 0.05, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                >
                  <Link
                    href={link.href}
                    onClick={() => setOpen(false)}
                    className="group flex items-center justify-between border-b border-white/10 py-4 text-3xl font-semibold tracking-tight text-white"
                  >
                    <span className="flex items-baseline gap-4">
                      <span className="text-xs font-medium text-gold tabular-nums">0{i + 1}</span>
                      {link.label}
                    </span>
                    <ArrowUpRight className="size-5 text-white/30 transition group-hover:text-teal rtl:-scale-x-100" />
                  </Link>
                </motion.div>
              ))}
            </nav>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.45, duration: 0.6 }}
              className="mt-auto flex flex-col gap-3 pt-10"
            >
              <Link href="/trips" onClick={() => setOpen(false)} className="btn btn-primary w-full py-4 text-base">
                {t.nav.cta}
              </Link>
              <div className="grid grid-cols-2 gap-3">
                <a href={chatLink().href} target="_blank" rel="noopener noreferrer" className="btn btn-ghost-light">
                  <ChatIcon className="size-4" />
                  {t.booking.chat}
                </a>
                <a href={company.facebook.url} target="_blank" rel="noopener noreferrer" className="btn btn-ghost-light">
                  <FacebookIcon className="size-4" />
                  Facebook
                </a>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
