"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { AnimatePresence, LayoutGroup, motion } from "framer-motion";
import { ArrowRight, Info } from "lucide-react";
import { useLang } from "@/lib/i18n";
import { cn } from "@/lib/cn";
import { featuredTrips } from "@/data/trips";
import { company } from "@/data/company";
import { availableCategories } from "@/lib/trip-filters";
import type { TripCategory } from "@/lib/types";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { TripCard } from "@/components/trips/TripCard";

export function FeaturedTrips() {
  const { t, isRTL } = useLang();
  const [active, setActive] = useState<TripCategory | "all">("all");

  const categories = useMemo(() => availableCategories(featuredTrips), []);
  const visible = active === "all" ? featuredTrips : featuredTrips.filter((trip) => trip.categories.includes(active));

  return (
    <section id="trips" className="relative bg-white py-24 sm:py-32">
      <div className="container-x">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <SectionHeading eyebrow={t.trips.eyebrow} title={t.trips.title} text={t.trips.text} />
          <Reveal delay={0.1}>
            <Link href="/trips" className="btn btn-outline">
              {t.trips.viewAll}
              <ArrowRight className="size-4 rtl:-scale-x-100" />
            </Link>
          </Reveal>
        </div>

        {/* Category tabs */}
        <Reveal delay={0.15} className="-mx-5 mt-12 sm:mx-0">
          <LayoutGroup id="featured-tabs">
            <div className="no-scrollbar flex gap-2 overflow-x-auto px-5 sm:flex-wrap sm:px-0" role="tablist">
              {(["all", ...categories] as const).map((c) => {
                const selected = active === c;
                return (
                  <button
                    key={c}
                    type="button"
                    role="tab"
                    aria-selected={selected}
                    onClick={() => setActive(c)}
                    className={cn(
                      "relative shrink-0 rounded-full px-5 py-2.5 text-sm font-medium transition-colors duration-300",
                      selected ? "text-white" : "text-ink/70 ring-1 ring-line hover:text-navy-900 hover:ring-navy-900/30",
                    )}
                  >
                    {selected && <motion.span layoutId="featured-pill" className="absolute inset-0 rounded-full bg-navy-900" transition={{ type: "spring", stiffness: 380, damping: 32 }} />}
                    <span className="relative">{c === "all" ? t.trips.all : t.categories[c]}</span>
                  </button>
                );
              })}
            </div>
          </LayoutGroup>
        </Reveal>

        {/* Cards: horizontal swipe on mobile, grid on larger screens */}
        <motion.div
          layout
          className="no-scrollbar -mx-5 mt-10 flex snap-x snap-mandatory gap-5 overflow-x-auto scroll-px-5 px-5 pb-6 md:mx-0 md:grid md:grid-cols-2 md:gap-7 md:overflow-visible md:px-0 lg:grid-cols-3"
        >
          <AnimatePresence mode="popLayout" initial={false}>
            {visible.map((trip, i) => (
              <motion.div
                key={trip.id}
                layout
                initial={{ opacity: 0, y: 40, scale: 0.97 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true, margin: "-40px" }}
                exit={{ opacity: 0, scale: 0.95, transition: { duration: 0.25 } }}
                transition={{ duration: 0.8, delay: (i % 3) * 0.08, ease: [0.22, 1, 0.36, 1] }}
                className="w-[84%] shrink-0 snap-start sm:w-[60%] md:w-auto"
              >
                <TripCard trip={trip} />
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        <div className="mt-4 flex flex-col items-start justify-between gap-3 text-sm text-muted sm:flex-row sm:items-center">
          <p className="text-xs font-medium tracking-[0.2em] uppercase md:hidden">{t.trips.swipe} {isRTL ? "←" : "→"}</p>
          {company.demoMode && (
            <p className="flex items-center gap-2 text-xs">
              <Info className="size-3.5 text-gold" />
              {t.trips.demoNote}
            </p>
          )}
        </div>
      </div>
    </section>
  );
}
