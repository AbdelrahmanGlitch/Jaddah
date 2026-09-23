"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, ArrowUpRight, Info } from "lucide-react";
import { useLang } from "@/lib/i18n";
import { cn } from "@/lib/cn";
import { destinations } from "@/data/destinations";
import { trips } from "@/data/trips";
import { company } from "@/data/company";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";

/** Bento layout — tile spans by position so any number of destinations still looks composed. */
const spans = [
  "col-span-2 row-span-2",
  "col-span-2 row-span-2",
  "",
  "",
  "",
  "",
  "col-span-2 lg:col-span-2",
  "",
  "",
  "col-span-2 lg:col-span-2",
];

export function Destinations() {
  const { t, l } = useLang();

  return (
    <section id="destinations" className="grain relative overflow-hidden bg-navy-900 py-24 text-white sm:py-32">
      <div className="pointer-events-none absolute -top-40 end-0 size-[40rem] rounded-full bg-ocean/20 blur-[140px]" />
      <div className="container-x relative">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <SectionHeading tone="dark" eyebrow={t.destinations.eyebrow} title={t.destinations.title} text={t.destinations.text} />
          {company.demoMode && (
            <Reveal delay={0.1}>
              <p className="flex items-center gap-2 text-xs text-white/50">
                <Info className="size-3.5 text-gold" />
                {t.destinations.demoNote}
              </p>
            </Reveal>
          )}
        </div>

        <div className="mt-14 grid auto-rows-[190px] grid-cols-2 gap-3 sm:auto-rows-[230px] sm:gap-4 lg:auto-rows-[250px] lg:grid-cols-4">
          {destinations.map((d, i) => {
            const count = trips.filter((tr) => tr.destinationId === d.id).length;
            const big = i < 2;
            return (
              <motion.div
                key={d.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.9, delay: (i % 4) * 0.07, ease: [0.22, 1, 0.36, 1] }}
                className={cn("relative", spans[i % spans.length])}
              >
                <Link
                  href={count ? `/trips?destination=${d.id}` : "/trips"}
                  className="group relative block h-full overflow-hidden rounded-lg"
                  aria-label={`${l(d.name)} — ${t.destinations.explore}`}
                >
                  <Image
                    src={d.image}
                    alt={l(d.name)}
                    fill
                    sizes={big ? "(max-width: 1024px) 100vw, 50vw" : "(max-width: 1024px) 50vw, 25vw"}
                    className="object-cover transition-transform duration-[1.8s] ease-(--ease-premium) group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-linear-to-t from-navy-950/90 via-navy-950/20 to-transparent transition-opacity duration-700 group-hover:opacity-90" />
                  <div className="absolute inset-0 bg-ocean/0 transition-colors duration-700 group-hover:bg-ocean/15" />

                  <span className="absolute end-3 top-3 rounded-full bg-navy-950/40 px-2.5 py-1 text-[10.5px] font-semibold tracking-wide text-white/90 ring-1 ring-white/15 backdrop-blur-md sm:end-4 sm:top-4">
                    {t.destinations.tripsCount(count)}
                  </span>

                  <div className="absolute inset-x-0 bottom-0 p-4 sm:p-6">
                    <p className="text-[10px] font-semibold tracking-[0.22em] text-sand/80 uppercase sm:text-[11px]">{l(d.country)}</p>
                    <h3 className={cn("mt-1 leading-tight font-semibold tracking-tight", big ? "text-2xl sm:text-4xl" : "text-lg sm:text-2xl")}>{l(d.name)}</h3>

                    {/* Revealed on hover (always visible on touch devices) */}
                    <div className="grid grid-rows-[1fr] transition-all duration-500 ease-(--ease-premium) [@media(hover:hover)]:grid-rows-[0fr] [@media(hover:hover)]:group-hover:grid-rows-[1fr]">
                      <div className="overflow-hidden">
                        <p className={cn("mt-2 text-sm text-white/70", !big && "hidden sm:block")}>{l(d.tagline)}</p>
                        <span className="mt-3 inline-flex items-center gap-2 text-[13px] font-semibold text-teal">
                          {t.destinations.explore}
                          <ArrowRight className="size-4 transition-transform group-hover:translate-x-1 rtl:-scale-x-100 rtl:group-hover:-translate-x-1" />
                        </span>
                      </div>
                    </div>
                  </div>
                </Link>
              </motion.div>
            );
          })}

          {/* Closing CTA tile */}
          <Reveal className="col-span-2 lg:col-span-4" y={30}>
            <Link
              href="/trips"
              className="group flex h-full flex-col justify-between rounded-lg border border-white/10 bg-white/[0.04] p-6 transition-colors duration-500 hover:border-teal/50 hover:bg-white/[0.07] sm:p-8"
            >
              <span className="eyebrow text-gold">{t.nav.trips}</span>
              <span className="flex items-end justify-between gap-6">
                <span className="max-w-xs text-2xl leading-snug font-semibold tracking-tight sm:text-3xl">{t.trips.title}</span>
                <span className="grid size-14 shrink-0 place-items-center rounded-full bg-teal text-navy-950 transition-transform duration-500 group-hover:rotate-45 rtl:group-hover:-rotate-45">
                  <ArrowUpRight className="size-6 rtl:-scale-x-100" />
                </span>
              </span>
            </Link>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
