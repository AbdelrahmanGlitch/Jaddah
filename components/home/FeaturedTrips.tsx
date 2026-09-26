"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Info } from "lucide-react";
import { useLang } from "@/lib/i18n";
import { featuredTrips } from "@/data/trips";
import { company } from "@/data/company";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";
import { TripCard } from "@/components/trips/TripCard";

/** Hotel & resort offers from Lavie's Facebook posts. */
export function FeaturedTrips() {
  const { t, isRTL } = useLang();

  return (
    <section id="offers" className="relative bg-mist py-24 sm:py-32">
      <div className="container-x">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <SectionHeading eyebrow={t.trips.eyebrow} title={t.trips.title} text={t.trips.text} />
          <Reveal delay={0.1}>
            <Link href="/trips" className="btn btn-outline bg-white">
              {t.trips.viewAll}
              <ArrowRight className="size-4 rtl:-scale-x-100" />
            </Link>
          </Reveal>
        </div>

        {/* Cards: horizontal swipe on mobile, grid on larger screens */}
        <div className="no-scrollbar -mx-5 mt-12 flex snap-x snap-mandatory gap-5 overflow-x-auto scroll-px-5 px-5 pb-6 md:mx-0 md:grid md:grid-cols-2 md:gap-7 md:overflow-visible md:px-0 lg:grid-cols-3">
          {featuredTrips.map((trip, i) => (
            <motion.div
              key={trip.id}
              initial={{ opacity: 0, y: 40, scale: 0.97 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.8, delay: (i % 3) * 0.08, ease: [0.22, 1, 0.36, 1] }}
              className="w-[84%] shrink-0 snap-start sm:w-[60%] md:w-auto"
            >
              <TripCard trip={trip} />
            </motion.div>
          ))}
        </div>

        <div className="mt-4 flex flex-col items-start justify-between gap-3 text-sm text-muted sm:flex-row sm:items-center">
          <p className="text-xs font-medium tracking-[0.2em] uppercase md:hidden">
            {t.trips.swipe} {isRTL ? "←" : "→"}
          </p>
          {company.demoMode && (
            <p className="flex items-center gap-2 text-xs">
              <Info className="size-3.5 text-sun-deep" />
              {t.trips.demoNote}
            </p>
          )}
        </div>
      </div>
    </section>
  );
}
