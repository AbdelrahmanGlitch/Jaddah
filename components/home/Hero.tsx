"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useScroll, useTransform } from "framer-motion";
import { ArrowRight, CalendarDays, MapPin } from "lucide-react";
import { useLang } from "@/lib/i18n";
import { images } from "@/data/images";
import { featuredTrips, lowestAdultPrice } from "@/data/trips";
import { durationLabel } from "@/components/trips/TripMeta";
import { formatCurrencyLabel, formatNumber } from "@/lib/format";
import type { Localized, Trip } from "@/lib/types";

/** Hero slideshow — replace images/labels with real company photos anytime. */
const slides: { image: string; label: Localized }[] = [
  { image: images.matrouhHero, label: { en: "Summer by the Sea", ar: "صيف على البحر" } },
  { image: images.matrouhFayrouzSunset, label: { en: "Sunset Waters", ar: "مياه الغروب" } },
  { image: images.haramPanoramaSunset, label: { en: "Hajj & Umrah", ar: "الحج والعمرة" } },
];

const ease = [0.22, 1, 0.36, 1] as const;

export function Hero() {
  const { t, l, lang } = useLang();
  const [index, setIndex] = useState(0);
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const contentY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);
  const bgY = useTransform(scrollYProgress, [0, 1], ["0%", "15%"]);

  useEffect(() => {
    const id = window.setInterval(() => setIndex((i) => (i + 1) % slides.length), 7000);
    return () => window.clearInterval(id);
  }, [index]);

  const floating = featuredTrips.slice(0, 2);

  return (
    <section ref={ref} className="relative isolate flex min-h-svh flex-col overflow-hidden bg-navy-950 text-white">
      {/* Background slideshow */}
      <motion.div className="absolute inset-0 -z-10" style={{ y: bgY }}>
        <AnimatePresence initial={false}>
          <motion.div
            key={index}
            className="absolute inset-0"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.6, ease: "easeInOut" }}
          >
            <Image
              src={slides[index].image}
              alt={l(slides[index].label)}
              fill
              preload={index === 0}
              sizes="100vw"
              className="animate-kenburns object-cover"
            />
          </motion.div>
        </AnimatePresence>
        {/* Sophisticated overlay: readable text, preserved color */}
        <div className="absolute inset-0 bg-linear-to-t from-navy-950 via-navy-950/35 to-navy-950/55" />
        <div className="absolute inset-0 bg-linear-to-r from-navy-950/75 via-navy-950/20 to-transparent rtl:bg-linear-to-l" />
      </motion.div>

      <motion.div style={{ y: contentY, opacity: contentOpacity }} className="container-x relative flex flex-1 flex-col justify-end pt-36 pb-44 sm:pb-48">
        <div className="grid items-end gap-12 lg:grid-cols-12">
          <div className="lg:col-span-8">
            <motion.span
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.8, ease }}
              className="eyebrow text-sand"
            >
              {t.hero.eyebrow}
            </motion.span>

            <h1 className="rtl-leading mt-6 text-[clamp(2.9rem,9vw,7.5rem)] leading-[0.95] font-semibold tracking-[-0.045em]">
              {[t.hero.titleA, t.hero.titleB].map((line, i) => (
                <span key={`${lang}-${i}`} className="block overflow-hidden pb-[0.08em]">
                  <motion.span
                    className={i === 1 ? "block bg-linear-to-r from-white via-sand to-teal bg-clip-text text-transparent rtl:bg-linear-to-l" : "block"}
                    initial={{ y: "110%" }}
                    animate={{ y: 0 }}
                    transition={{ delay: 0.35 + i * 0.12, duration: 1.1, ease }}
                  >
                    {line}
                  </motion.span>
                </span>
              ))}
            </h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.75, duration: 0.9, ease }}
              className="mt-7 max-w-xl text-base leading-relaxed text-white/80 sm:text-lg"
            >
              {t.hero.text}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.9, duration: 0.9, ease }}
              className="mt-10 flex flex-col gap-3 sm:flex-row"
            >
              <Link href="/trips" className="btn btn-primary px-8 py-4 text-[15px]">
                {t.hero.cta1}
                <ArrowRight className="size-4 rtl:-scale-x-100" />
              </Link>
              <Link href="/#contact" className="btn btn-ghost-light px-8 py-4 text-[15px]">
                {t.hero.cta2}
              </Link>
            </motion.div>
          </div>

          {/* Floating trip info */}
          <div className="relative hidden h-full min-h-[320px] lg:col-span-4 lg:block">
            {floating.map((trip, i) => (
              <FloatingTripCard key={trip.id} trip={trip} index={i} />
            ))}
          </div>
        </div>
      </motion.div>

      {/* Slide indicators + scroll cue */}
      <div className="container-x absolute inset-x-0 bottom-24 flex items-end justify-between">
        <div className="flex gap-6">
          {slides.map((s, i) => (
            <button
              key={i}
              type="button"
              onClick={() => setIndex(i)}
              className="group hidden flex-col items-start gap-2 text-start sm:flex"
              aria-label={l(s.label)}
            >
              <span className="relative h-px w-16 overflow-hidden bg-white/25">
                {i === index && (
                  <motion.span
                    key={`bar-${index}`}
                    className="absolute inset-y-0 start-0 bg-teal"
                    initial={{ width: "0%" }}
                    animate={{ width: "100%" }}
                    transition={{ duration: 7, ease: "linear" }}
                  />
                )}
              </span>
              <span className={`text-[11px] font-medium tracking-[0.18em] uppercase transition-colors ${i === index ? "text-white" : "text-white/40 group-hover:text-white/70"}`}>
                0{i + 1} · {l(s.label)}
              </span>
            </button>
          ))}
        </div>

        <a href="#finder" className="mx-auto flex flex-col items-center gap-3 text-[10px] font-medium tracking-[0.3em] text-white/60 uppercase sm:mx-0" aria-label={t.hero.scroll}>
          <span className="relative flex h-10 w-6 justify-center rounded-full border border-white/35 pt-2">
            <span className="animate-scroll-dot size-1 rounded-full bg-white" />
          </span>
          <span className="hidden sm:block">{t.hero.scroll}</span>
        </a>
      </div>
    </section>
  );
}

function FloatingTripCard({ trip, index }: { trip: Trip; index: number }) {
  const { t, l, lang } = useLang();
  const position = index === 0 ? "top-0 end-0" : "bottom-4 start-4";
  const price = trip.pricingSchedule ? undefined : lowestAdultPrice(trip);
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 1.1 + index * 0.2, duration: 1, ease }}
      className={`absolute ${position}`}
    >
      <Link
        href={`/trips/${trip.id}`}
        className="group flex w-72 items-center gap-4 rounded-lg border border-white/15 bg-white/10 p-3 pe-5 shadow-2xl shadow-navy-950/40 backdrop-blur-xl transition hover:border-white/30 hover:bg-white/15"
        style={{ animation: `float 7s ease-in-out ${index * 1.5}s infinite` }}
      >
        <span className="relative size-20 shrink-0 overflow-hidden rounded-md">
          <Image src={trip.heroImage} alt={l(trip.title)} fill sizes="80px" className="object-cover transition duration-700 group-hover:scale-110" />
        </span>
        <span className="min-w-0">
          <span className="block text-[10px] font-semibold tracking-[0.2em] text-gold uppercase">{t.hero.nextDeparture}</span>
          <span className="mt-1 flex items-center gap-1 truncate text-sm font-semibold">
            <MapPin className="size-3.5 shrink-0 text-teal" />
            {l(trip.destination)}
          </span>
          {durationLabel(trip, lang) && (
            <span className="mt-1 flex items-center gap-1 text-xs text-white/70">
              <CalendarDays className="size-3.5 shrink-0" />
              {durationLabel(trip, lang)}
            </span>
          )}
          <span className="mt-1.5 block text-xs text-white/70">
            {price === undefined ? (
              t.trips.pricesVary
            ) : (
              <>
                {t.hero.from} <span className="font-semibold text-white">{formatNumber(price, lang)}</span> {formatCurrencyLabel(trip.currency, lang)}
              </>
            )}
          </span>
        </span>
      </Link>
    </motion.div>
  );
}
