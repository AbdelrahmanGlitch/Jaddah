"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useScroll, useTransform } from "framer-motion";
import { ArrowLeft, ArrowRight, CalendarDays, Check, Clock3, Expand, Images, Info, MapPin, Plane, Sun, X } from "lucide-react";
import { useLang } from "@/lib/i18n";
import { cn } from "@/lib/cn";
import { countLabel, formatCurrencyLabel, formatDate, formatMonthDay, formatNumber } from "@/lib/format";
import { hasPrice, lowestAdultPrice, tripDepartures } from "@/data/trips";
import { chatLink, company } from "@/data/company";
import type { Trip } from "@/lib/types";
import { AvailabilityBadge, OfferStamp, Price, ServiceList, durationLabel } from "./TripMeta";
import { TripCard } from "./TripCard";
import { Lightbox } from "@/components/ui/Lightbox";
import { Accordion } from "@/components/ui/Accordion";
import { Reveal } from "@/components/ui/Reveal";
import { BookingForm } from "@/components/booking/BookingForm";
import { FacebookIcon, WhatsAppIcon } from "@/components/ui/BrandIcons";

const ease = [0.22, 1, 0.36, 1] as const;

export function TripDetail({ trip, related }: { trip: Trip; related: Trip[] }) {
  const { t, l, lang } = useLang();
  const [lightbox, setLightbox] = useState<number | null>(null);
  const [activeSection, setActiveSection] = useState("overview");
  const [showBar, setShowBar] = useState(false);
  const heroRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const heroY = useTransform(scrollYProgress, [0, 1], ["0%", "20%"]);

  // Sections without supplied data are hidden (never filled with placeholder content).
  const sections = [
    { id: "overview", label: t.detail.overview, show: true },
    { id: "included", label: t.detail.included, show: trip.included.length > 0 || trip.excluded.length > 0 },
    { id: "itinerary", label: t.detail.itinerary, show: trip.itinerary.length > 0 },
    { id: "info", label: t.detail.info, show: trip.importantInfo.length > 0 },
    { id: "gallery", label: t.detail.gallery, show: trip.gallery.length > 0 },
    { id: "faq", label: t.detail.faq, show: trip.faq.length > 0 },
  ].filter((s) => s.show);
  const has = (id: string) => sections.some((s) => s.id === id);
  const num = (id: string) => String(sections.findIndex((s) => s.id === id) + 1).padStart(2, "0");

  // Highlight the section currently in view
  useEffect(() => {
    const els = ["overview", "included", "itinerary", "info", "gallery", "faq"].map((id) => document.getElementById(id)).filter(Boolean) as HTMLElement[];
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((e) => e.isIntersecting).sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible[0]) setActiveSection(visible[0].target.id);
      },
      { rootMargin: "-140px 0px -55% 0px" },
    );
    els.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  // Mobile sticky booking bar appears after the hero
  useEffect(() => {
    const onScroll = () => setShowBar(window.scrollY > window.innerHeight * 0.7);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const galleryItems = trip.gallery.map((src, i) => ({ src, alt: `${l(trip.title)} — ${i + 1}` }));

  const duration = durationLabel(trip, lang);
  // Mobile bar price: never a single figure for date-based (schedule) pricing
  const barPrice = trip.pricingSchedule ? undefined : lowestAdultPrice(trip);
  const singlePrice = (trip.priceOptions?.filter((p) => p.kind === "adult").length ?? 0) === 1;
  const departures = tripDepartures(trip);
  const facts = [
    { icon: MapPin, label: t.detail.destination, value: l(trip.destination) },
    duration && { icon: Clock3, label: t.detail.duration, value: duration },
    trip.period && { icon: CalendarDays, label: t.trips.period, value: l(trip.period) },
    trip.program && { icon: Info, label: t.trips.program, value: l(trip.program) },
    trip.season && { icon: Sun, label: t.trips.season, value: l(trip.season) },
    departures.length > 0 && { icon: CalendarDays, label: t.trips.departures, value: t.trips.datesCount(departures.length) },
    trip.departureCity && { icon: Plane, label: t.detail.departingFrom, value: l(trip.departureCity) },
    trip.postedOn && { icon: CalendarDays, label: t.detail.postedOn, value: formatDate(trip.postedOn, lang, { day: "numeric", month: "long", year: "numeric" }) },
  ]
    .filter((f): f is { icon: typeof Clock3; label: string; value: string } => Boolean(f))
    .slice(0, 4);
  const factCols = [
    "",
    "md:grid-cols-1 lg:grid-cols-[1fr_1.4fr]",
    "md:grid-cols-2 lg:grid-cols-[repeat(2,1fr)_1.4fr]",
    "md:grid-cols-3 lg:grid-cols-[repeat(3,1fr)_1.4fr]",
    "md:grid-cols-4 lg:grid-cols-[repeat(4,1fr)_1.4fr]",
  ][facts.length];
  const priceSpan = ["md:col-span-1", "md:col-span-1", "md:col-span-2", "md:col-span-3", "md:col-span-4"][facts.length];

  return (
    <article className="bg-mist">
      {/* ---------- Hero ---------- */}
      <section ref={heroRef} className="relative isolate overflow-hidden bg-navy-950 text-white">
        {/* Soft backdrop from the offer photo; the photo itself is shown framed (Facebook photos are small) */}
        <motion.div className="absolute inset-0 -z-10 opacity-45" style={{ y: heroY }}>
          <Image src={trip.heroImage} alt="" fill sizes="50vw" className="scale-110 object-cover blur-2xl" />
        </motion.div>
        <div className="absolute inset-0 -z-10 bg-linear-to-t from-navy-950 via-navy-950/75 to-navy-950/55" />

        <div className="container-x grid items-center gap-12 pt-32 pb-14 lg:grid-cols-12 lg:gap-16 lg:pt-36 lg:pb-20">
          <div className="lg:col-span-7">
            <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
              <Link href="/trips" className="inline-flex items-center gap-2 text-sm font-medium text-white/70 transition hover:text-white">
                <ArrowLeft className="size-4 rtl:-scale-x-100" />
                {t.detail.back}
              </Link>
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1, duration: 0.8, ease }} className="mt-8 flex flex-wrap items-center gap-2">
              <OfferStamp trip={trip} />
              {trip.categories.map((c) => (
                <span key={c} className="rounded-full bg-white/10 px-3 py-1 text-[11px] font-semibold tracking-wide ring-1 ring-white/20 backdrop-blur-md">
                  {t.categories[c]}
                </span>
              ))}
              {trip.availability && <AvailabilityBadge availability={trip.availability} />}
            </motion.div>
            <motion.p initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2, duration: 0.8, ease }} className="mt-6 flex items-center gap-2 text-sm font-semibold text-sand">
              <MapPin className="size-4 text-sun" />
              {l(trip.destination)} · {l(trip.country)}
            </motion.p>
            <h1 className="rtl-leading mt-4 overflow-hidden text-[clamp(2.4rem,5.6vw,4.6rem)] leading-[1.05] font-bold tracking-[-0.03em] text-balance">
              <motion.span className="block" initial={{ y: "100%" }} animate={{ y: 0 }} transition={{ delay: 0.3, duration: 1.1, ease }}>
                {l(trip.title)}
              </motion.span>
            </h1>
            <motion.p initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5, duration: 0.8, ease }} className="mt-5 max-w-2xl text-base leading-relaxed text-white/75 sm:text-lg">
              {l(trip.shortDescription)}
            </motion.p>
            <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6, duration: 0.8, ease }} className="mt-8 flex flex-col gap-3 sm:flex-row">
              <a href={chatLink(`${t.detail.book}: ${l(trip.title)} — ${l(trip.destination)}`).href} target="_blank" rel="noopener noreferrer" className="btn btn-whatsapp px-7 py-4">
                <WhatsAppIcon className="size-5" />
                {t.detail.askQuestion}
              </a>
              <a href="#book" className="btn btn-ghost-light px-7 py-4">
                {t.detail.book}
              </a>
            </motion.div>
          </div>

          {/* Framed photo + thumbnails */}
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4, duration: 1, ease }} className="mx-auto w-full max-w-sm lg:col-span-5 lg:max-w-md">
            <button type="button" onClick={() => setLightbox(0)} className="group relative block aspect-[4/5] w-full overflow-hidden rounded-2xl shadow-[0_40px_80px_-30px_rgba(0,0,0,0.7)] ring-4 ring-white/90" aria-label={t.detail.viewGallery}>
              <Image src={trip.heroImage} alt={l(trip.title)} fill preload sizes="(max-width: 1024px) 90vw, 30vw" className="object-cover transition-transform duration-[1.4s] ease-(--ease-premium) group-hover:scale-105" style={{ objectPosition: "50% 60%" }} />
              <span className="absolute end-3 bottom-3 flex items-center gap-1.5 rounded-full bg-navy-950/60 px-3 py-1.5 text-xs font-semibold backdrop-blur-md">
                <Images className="size-4" strokeWidth={1.6} />
                {trip.gallery.length} {t.detail.photos}
              </span>
            </button>
            {trip.gallery.length > 1 && (
              <div className="mt-3 flex gap-2">
                {trip.gallery.slice(1, 5).map((src, i) => (
                  <button key={src} type="button" onClick={() => setLightbox(i + 1)} className="group relative aspect-square w-1/4 overflow-hidden rounded-md ring-1 ring-white/25" aria-label={galleryItems[i + 1].alt}>
                    <Image src={src} alt="" fill sizes="96px" className="object-cover transition duration-700 group-hover:scale-110" />
                  </button>
                ))}
              </div>
            )}
          </motion.div>
        </div>
      </section>

      {/* ---------- Key facts ---------- */}
      <section className="relative z-10 -mt-px border-b border-line bg-white">
        <div className="container-x">
        <div className={cn("grid grid-cols-2 gap-px bg-line", factCols)}>
          {facts.map((f) => (
            <div key={f.label} className="bg-white py-6 pe-4 md:py-8">
              <p className="flex items-center gap-2 text-[10.5px] font-semibold tracking-[0.18em] text-muted uppercase">
                <f.icon className="size-3.5 text-ocean" strokeWidth={1.8} />
                {f.label}
              </p>
              <p className="mt-2 text-[15px] font-semibold text-navy-900 sm:text-base">{f.value}</p>
            </div>
          ))}
          <div className={cn("col-span-2 flex items-center justify-between gap-4 bg-white py-6 lg:col-span-1 lg:ps-8", priceSpan)}>
            <Price trip={trip} />
            <a href="#book" className="btn btn-primary">
              {t.detail.bookNow}
              <ArrowRight className="size-4 rtl:-scale-x-100" />
            </a>
          </div>
        </div>
        </div>
      </section>

      {/* ---------- Section nav ---------- */}
      <nav aria-label={t.detail.sectionsNav} className="sticky top-[68px] z-30 border-b border-line bg-mist/90 backdrop-blur-xl">
        <div className="container-x no-scrollbar flex gap-1 overflow-x-auto">
          {sections.map((s) => (
            <a
              key={s.id}
              href={`#${s.id}`}
              className={cn("relative shrink-0 px-3 py-4 text-[13px] font-medium transition-colors sm:px-4", activeSection === s.id ? "text-navy-900" : "text-muted hover:text-navy-900")}
            >
              {s.label}
              {activeSection === s.id && <motion.span layoutId="section-underline" className="absolute inset-x-3 bottom-0 h-0.5 bg-sun sm:inset-x-4" />}
            </a>
          ))}
        </div>
      </nav>

      {/* ---------- Body ---------- */}
      <div className="container-x grid gap-14 py-16 lg:grid-cols-12 lg:gap-16 lg:py-24">
        <div className="min-w-0 space-y-24 lg:col-span-8">
          {/* Overview */}
          <section id="overview" className="scroll-mt-36">
            <DetailHeading index={num("overview")} title={t.detail.overview} />
            <Reveal>
              <p className="mt-8 text-lg leading-relaxed text-ink/80 sm:text-xl">{l(trip.description)}</p>
              {trip.postedOn && (
                <a href={company.facebook.url} target="_blank" rel="noopener noreferrer" className="mt-5 inline-flex items-center gap-2 text-sm font-medium text-muted transition hover:text-ocean">
                  <FacebookIcon className="size-4 text-[#1877F2]" />
                  {t.detail.source} {formatDate(trip.postedOn, lang, { day: "numeric", month: "long", year: "numeric" })}
                </a>
              )}
            </Reveal>
            {trip.highlights.length > 0 && (
              <Reveal delay={0.1}>
                <h3 className="mt-12 text-xs font-semibold tracking-[0.2em] text-sun-deep uppercase">{t.detail.highlights}</h3>
                <ul className="mt-5 grid gap-3 sm:grid-cols-2">
                  {trip.highlights.map((h) => (
                    <li key={h.en} className="flex items-center gap-3 rounded-md border border-line bg-white px-4 py-3.5 text-[15px] font-medium text-navy-900">
                      <span className="size-1.5 shrink-0 rotate-45 bg-sun-deep" />
                      {l(h)}
                    </li>
                  ))}
                </ul>
              </Reveal>
            )}

            {/* Fixed prices */}
            {trip.priceOptions && trip.priceOptions.length > 0 && (
              <Reveal delay={0.1}>
                <h3 className="mt-12 text-xs font-semibold tracking-[0.2em] text-sun-deep uppercase">{t.detail.prices}</h3>
                <ul className="mt-5 grid gap-3 sm:grid-cols-2">
                  {trip.priceOptions.map((p) => (
                    <li key={p.label.en} className="rounded-md border border-line bg-white px-4 py-3.5">
                      <div className="flex items-baseline justify-between gap-4">
                        <span className="text-[15px] font-medium text-navy-900">{l(p.label)}</span>
                        <span className="shrink-0 font-semibold text-navy-900">
                          <span className="tabular-nums">{formatNumber(p.amount, lang)}</span> <span className="text-sm text-sun-deep">{formatCurrencyLabel(trip.currency, lang)}</span>
                        </span>
                      </div>
                      {p.note && <p className="mt-1 text-sm text-muted">{l(p.note)}</p>}
                    </li>
                  ))}
                </ul>
              </Reveal>
            )}

            {/* Date-based prices */}
            {trip.pricingSchedule && trip.pricingSchedule.length > 0 && (
              <Reveal delay={0.1}>
                <h3 className="mt-12 text-xs font-semibold tracking-[0.2em] text-sun-deep uppercase">{t.detail.schedule}</h3>
                {/* Phones: one card per date group, so every price stays visible */}
                <ul className="mt-5 space-y-3 sm:hidden">
                  {trip.pricingSchedule.map((row) => (
                    <li key={row.dates.join()} className="rounded-md border border-line bg-white p-4">
                      <div className="flex flex-wrap gap-1.5">
                        {row.dates.map((d) => (
                          <span key={d} className="rounded-full bg-mist px-2.5 py-0.5 text-[13px] font-medium text-navy-900 ring-1 ring-line">
                            {formatMonthDay(d, lang)}
                          </span>
                        ))}
                      </div>
                      <dl className="mt-4 grid grid-cols-3 gap-2 border-t border-line pt-3">
                        <div>
                          <dt className="text-[10px] font-semibold tracking-[0.14em] text-muted uppercase">{t.detail.nights}</dt>
                          <dd className="mt-1 text-sm text-ink/80">{countLabel(row.nights, "night", lang)}</dd>
                        </div>
                        <div>
                          <dt className="text-[10px] font-semibold tracking-[0.14em] text-muted uppercase">{t.detail.adult}</dt>
                          <dd className="mt-1 text-sm font-semibold whitespace-nowrap text-navy-900 tabular-nums">
                            {formatNumber(row.adult, lang)} <span className="text-xs text-sun-deep">{formatCurrencyLabel(trip.currency, lang)}</span>
                          </dd>
                        </div>
                        <div>
                          <dt className="text-[10px] font-semibold tracking-[0.14em] text-muted uppercase">{t.detail.child}</dt>
                          <dd className="mt-1 text-sm font-semibold whitespace-nowrap text-navy-900 tabular-nums">
                            {formatNumber(row.child, lang)} <span className="text-xs text-sun-deep">{formatCurrencyLabel(trip.currency, lang)}</span>
                          </dd>
                        </div>
                      </dl>
                    </li>
                  ))}
                </ul>

                {/* Tablet & desktop: table */}
                <div className="mt-5 hidden overflow-x-auto rounded-md border border-line bg-white sm:block">
                  <table className="w-full min-w-[520px] text-[15px]">
                    <thead>
                      <tr className="border-b border-line text-[10.5px] tracking-[0.16em] text-muted uppercase">
                        <th className="px-4 py-3 text-start font-semibold">{t.detail.dates}</th>
                        <th className="px-4 py-3 text-start font-semibold">{t.detail.nights}</th>
                        <th className="px-4 py-3 text-end font-semibold">{t.detail.adult}</th>
                        <th className="px-4 py-3 text-end font-semibold">{t.detail.child}</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-line">
                      {trip.pricingSchedule.map((row) => (
                        <tr key={row.dates.join()}>
                          <td className="px-4 py-3">
                            <div className="flex flex-wrap gap-1.5">
                              {row.dates.map((d) => (
                                <span key={d} className="rounded-full bg-mist px-2.5 py-0.5 text-[13px] font-medium text-navy-900 ring-1 ring-line">
                                  {formatMonthDay(d, lang)}
                                </span>
                              ))}
                            </div>
                          </td>
                          <td className="px-4 py-3 whitespace-nowrap text-ink/80">{countLabel(row.nights, "night", lang)}</td>
                          <td className="px-4 py-3 text-end font-semibold whitespace-nowrap text-navy-900 tabular-nums">
                            {formatNumber(row.adult, lang)} <span className="text-sm text-sun-deep">{formatCurrencyLabel(trip.currency, lang)}</span>
                          </td>
                          <td className="px-4 py-3 text-end font-semibold whitespace-nowrap text-navy-900 tabular-nums">
                            {formatNumber(row.child, lang)} <span className="text-sm text-sun-deep">{formatCurrencyLabel(trip.currency, lang)}</span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </Reveal>
            )}

            {/* Departure dates (fixed-price trips) */}
            {trip.departures && trip.departures.length > 0 && (
              <Reveal delay={0.1}>
                <h3 className="mt-12 text-xs font-semibold tracking-[0.2em] text-sun-deep uppercase">{t.trips.departures}</h3>
                <ul className="mt-5 flex flex-wrap gap-2">
                  {departures.map((d) => (
                    <li key={d} className="flex items-center gap-2 rounded-md border border-line bg-white px-3.5 py-2 text-[15px] font-medium text-navy-900">
                      <CalendarDays className="size-3.5 text-ocean" strokeWidth={1.8} />
                      {formatMonthDay(d, lang)}
                    </li>
                  ))}
                </ul>
              </Reveal>
            )}
          </section>

          {/* Included / Not included */}
          {has("included") && (
          <section id="included" className="scroll-mt-36">
            <DetailHeading index={num("included")} title={t.detail.included} />
            <div className={cn("mt-8 grid gap-6", trip.included.length > 0 && trip.excluded.length > 0 && "md:grid-cols-2")}>
              {trip.included.length > 0 && (
              <Reveal className="rounded-lg border border-line bg-white p-7">
                <h3 className="flex items-center gap-2 font-semibold text-navy-900">
                  <span className="grid size-7 place-items-center rounded-full bg-sun/15 text-sun">
                    <Check className="size-4" strokeWidth={2.5} />
                  </span>
                  {t.detail.included}
                </h3>
                <ul className="mt-6 space-y-3.5">
                  {trip.included.map((item) => (
                    <li key={item.en} className="flex gap-3 text-[15px] leading-snug text-ink/80">
                      <Check className="mt-0.5 size-4 shrink-0 text-sun" strokeWidth={2.2} />
                      {l(item)}
                    </li>
                  ))}
                </ul>
                <div className="mt-7 border-t border-line pt-5">
                  <ServiceList services={trip.services} max={8} />
                </div>
              </Reveal>
              )}
              {trip.excluded.length > 0 && (
              <Reveal delay={0.08} className="rounded-lg border border-line bg-white p-7">
                <h3 className="flex items-center gap-2 font-semibold text-navy-900">
                  <span className="grid size-7 place-items-center rounded-full bg-navy-900/5 text-muted">
                    <X className="size-4" strokeWidth={2.5} />
                  </span>
                  {t.detail.excluded}
                </h3>
                <ul className="mt-6 space-y-3.5">
                  {trip.excluded.map((item) => (
                    <li key={item.en} className="flex gap-3 text-[15px] leading-snug text-muted">
                      <X className="mt-0.5 size-4 shrink-0 text-muted/60" strokeWidth={2} />
                      {l(item)}
                    </li>
                  ))}
                </ul>
              </Reveal>
              )}
            </div>
          </section>
          )}

          {/* Itinerary timeline */}
          {has("itinerary") && (
          <section id="itinerary" className="scroll-mt-36">
            <DetailHeading index={num("itinerary")} title={t.detail.itinerary} />
            <ol className="relative mt-10">
              <span className="absolute start-[27px] top-2 bottom-2 w-px bg-line sm:start-[43px]" aria-hidden="true" />
              {trip.itinerary.map((day, i) => (
                <motion.li
                  key={day.day}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-60px" }}
                  transition={{ duration: 0.7, ease }}
                  className="relative grid grid-cols-[56px_1fr] gap-5 pb-10 last:pb-0 sm:grid-cols-[88px_1fr] sm:gap-8"
                >
                  <div className="relative z-10 flex flex-col items-center">
                    <span
                      className={cn(
                        "grid size-14 place-items-center rounded-full border text-center shadow-[0_8px_24px_-12px_rgba(11,31,51,0.35)] sm:size-[88px]",
                        i === 0 || i === trip.itinerary.length - 1 ? "border-navy-900 bg-navy-900 text-white" : "border-line bg-white text-navy-900",
                      )}
                    >
                      <span className="leading-none">
                        <span className={cn("block text-[9px] font-semibold tracking-[0.2em] uppercase sm:text-[10px]", i === 0 || i === trip.itinerary.length - 1 ? "text-sun-deep" : "text-ocean")}>
                          {t.trips.day}
                        </span>
                        <span className="mt-1 block text-lg font-semibold tabular-nums sm:text-2xl">{String(day.day).padStart(2, "0")}</span>
                      </span>
                    </span>
                  </div>
                  <div className="rounded-lg border border-line bg-white p-5 transition-shadow duration-500 hover:shadow-[0_20px_50px_-30px_rgba(11,31,51,0.35)] sm:p-7">
                    <h3 className="text-lg font-semibold tracking-tight text-navy-900 sm:text-xl">{l(day.title)}</h3>
                    <p className="mt-2 text-[15px] leading-relaxed text-muted">{l(day.description)}</p>
                  </div>
                </motion.li>
              ))}
            </ol>
          </section>
          )}

          {/* Important info */}
          {has("info") && (
          <section id="info" className="scroll-mt-36">
            <DetailHeading index={num("info")} title={t.detail.info} />
            <Reveal className="mt-8 rounded-lg border border-sun-deep/25 bg-sand-50 p-7 sm:p-9">
              <ul className="space-y-4">
                {trip.importantInfo.map((info) => (
                  <li key={info.en} className="flex gap-3 text-[15px] leading-relaxed text-ink/80">
                    <Info className="mt-0.5 size-4 shrink-0 text-sun-deep" />
                    {l(info)}
                  </li>
                ))}
              </ul>
            </Reveal>
          </section>
          )}

          {/* Gallery */}
          {has("gallery") && (
          <section id="gallery" className="scroll-mt-36">
            <DetailHeading index={num("gallery")} title={t.detail.gallery} />
            <div className="mt-8 grid auto-rows-[150px] grid-cols-2 gap-3 sm:auto-rows-[200px] sm:grid-cols-4">
              {trip.gallery.map((src, i) => (
                <motion.button
                  key={src}
                  type="button"
                  onClick={() => setLightbox(i)}
                  initial={{ opacity: 0, scale: 0.96 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.7, delay: i * 0.05, ease }}
                  className={cn("group relative overflow-hidden rounded-md", i === 0 && "col-span-2 row-span-2")}
                  aria-label={galleryItems[i].alt}
                >
                  <Image src={src} alt={galleryItems[i].alt} fill sizes={i === 0 ? "(max-width: 640px) 100vw, 40vw" : "(max-width: 640px) 50vw, 20vw"} className="object-cover transition-transform duration-[1.4s] ease-(--ease-premium) group-hover:scale-105" />
                  <span className="absolute inset-0 grid place-items-center bg-navy-950/0 text-white opacity-0 transition-all duration-500 group-hover:bg-navy-950/35 group-hover:opacity-100">
                    <Expand className="size-6" />
                  </span>
                </motion.button>
              ))}
            </div>
          </section>
          )}

          {/* FAQ */}
          {has("faq") && (
          <section id="faq" className="scroll-mt-36">
            <DetailHeading index={num("faq")} title={t.detail.faq} />
            <div className="mt-6">
              <Accordion items={trip.faq} />
            </div>
          </section>
          )}
        </div>

        {/* Sticky booking summary */}
        <aside className="lg:col-span-4">
          <div className="lg:sticky lg:top-36">
            <Reveal className="overflow-hidden rounded-xl bg-navy-900 text-white shadow-[0_40px_80px_-40px_rgba(11,31,51,0.6)]">
              <div className="relative h-36">
                <Image src={trip.gallery[1] ?? trip.heroImage} alt="" fill sizes="400px" className="object-cover opacity-70" />
                <div className="absolute inset-0 bg-linear-to-t from-navy-900 to-transparent" />
                {trip.availability && <AvailabilityBadge availability={trip.availability} className="absolute end-4 top-4" />}
              </div>
              <div className="p-7 pt-2">
                <Price trip={trip} size="lg" tone="dark" />
                {trip.priceNote && lowestAdultPrice(trip) !== undefined && !trip.pricingSchedule && <p className="mt-1 text-sm text-white/55">{l(trip.priceNote)}</p>}
                <dl className="mt-6 space-y-3 border-t border-white/10 pt-6 text-sm">
                  {facts.slice(0, 3).map((f) => (
                    <div key={f.label} className="flex justify-between gap-4">
                      <dt className="text-white/55">{f.label}</dt>
                      <dd className="font-semibold">{f.value}</dd>
                    </div>
                  ))}
                </dl>
                <a href="#book" className="btn btn-primary mt-7 w-full py-4">
                  {t.detail.book}
                </a>
                <a href={chatLink(`${t.detail.book}: ${l(trip.title)} — ${l(trip.destination)}`).href} target="_blank" rel="noopener noreferrer" className="btn btn-whatsapp mt-3 w-full">
                  <WhatsAppIcon className="size-4" />
                  {t.detail.askQuestion}
                </a>
                {company.demoMode && <p className="mt-5 text-center text-[11px] text-white/40">{t.trips.demoNote}</p>}
              </div>
            </Reveal>
          </div>
        </aside>
      </div>

      {/* ---------- Book this trip ---------- */}
      <section id="book" className="relative isolate overflow-hidden bg-navy-950 py-20 sm:py-28">
        <Image src={trip.heroImage} alt="" fill sizes="50vw" className="-z-10 object-cover opacity-25 blur-xl" />
        <div className="absolute inset-0 -z-10 bg-linear-to-b from-navy-950 via-navy-950/90 to-navy-950" />
        <div className="container-x grid gap-12 lg:grid-cols-12">
          <div className="text-white lg:col-span-4">
            <Reveal>
              <span className="eyebrow text-sand/80">{t.detail.book}</span>
              <h2 className="heading-lg rtl-leading mt-5 text-balance">{l(trip.title)}</h2>
              <p className="mt-5 text-white/65">{t.detail.bookText}</p>
              <div className="mt-8 space-y-3 border-t border-white/10 pt-8 text-sm text-white/80">
                <p className="flex items-center gap-3">
                  <MapPin className="size-4 text-sun" /> {l(trip.destination)}
                </p>
                {(trip.period || departures.length > 0) && (
                  <p className="flex items-center gap-3">
                    <CalendarDays className="size-4 shrink-0 text-sun" /> {trip.period ? l(trip.period) : `${t.trips.departures}: ${t.trips.datesCount(departures.length)}`}
                  </p>
                )}
                {duration && (
                  <p className="flex items-center gap-3">
                    <Clock3 className="size-4 text-sun" /> {duration}
                  </p>
                )}
              </div>
            </Reveal>
          </div>
          <Reveal delay={0.1} className="lg:col-span-8">
            <div className="rounded-xl bg-white p-6 sm:p-10">
              <BookingForm defaultTripId={trip.id} />
            </div>
          </Reveal>
        </div>
      </section>

      {/* ---------- Related ---------- */}
      {related.length > 0 && (
        <section className="py-20 sm:py-28">
          <div className="container-x">
            <div className="flex items-end justify-between gap-6">
              <Reveal>
                <h2 className="heading-lg rtl-leading text-navy-900">{t.detail.related}</h2>
              </Reveal>
              <Link href="/trips" className="btn btn-outline hidden sm:inline-flex">
                {t.trips.viewAll}
                <ArrowRight className="size-4 rtl:-scale-x-100" />
              </Link>
            </div>
            <div className="no-scrollbar -mx-5 mt-10 flex snap-x snap-mandatory gap-5 overflow-x-auto px-5 pb-4 md:mx-0 md:grid md:grid-cols-2 md:overflow-visible md:px-0 lg:grid-cols-3">
              {related.map((r) => (
                <div key={r.id} className="w-[84%] shrink-0 snap-start sm:w-[60%] md:w-auto">
                  <TripCard trip={r} />
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      <Lightbox items={galleryItems} index={lightbox} onChange={setLightbox} />

      {/* Mobile sticky booking bar */}
      <AnimatePresence>
        {showBar && (
          <motion.div
            initial={{ y: 100 }}
            animate={{ y: 0 }}
            exit={{ y: 100 }}
            transition={{ duration: 0.45, ease }}
            className="fixed inset-x-0 bottom-0 z-40 border-t border-line bg-white/95 px-5 pt-3 backdrop-blur-xl lg:hidden"
            style={{ paddingBottom: "max(0.75rem, env(safe-area-inset-bottom))" }}
          >
            <div className="flex items-center justify-between gap-4">
              <div className="min-w-0">
                {barPrice === undefined ? (
                  <p className="truncate font-semibold text-navy-900">{hasPrice(trip) ? t.trips.pricesVary : t.trips.priceOnRequest}</p>
                ) : (
                  <>
                    <p className="text-[10px] font-semibold tracking-[0.14em] text-muted uppercase">{singlePrice ? t.trips.pricePerPerson : t.trips.startingFrom}</p>
                    <p className="truncate font-semibold text-navy-900">
                      <span className="text-lg tabular-nums">{formatNumber(barPrice, lang)}</span> <span className="text-sm text-sun-deep">{formatCurrencyLabel(trip.currency, lang)}</span>
                    </p>
                  </>
                )}
              </div>
              <div className="flex items-center gap-2">
                <a href={chatLink(`${t.detail.book}: ${l(trip.title)}`).href} target="_blank" rel="noopener noreferrer" aria-label={t.booking.chat} className="grid size-12 place-items-center rounded-full bg-[#25D366] text-navy-950">
                  <WhatsAppIcon className="size-5" />
                </a>
                <a href="#book" className="btn btn-primary py-3">
                  {t.detail.bookNow}
                </a>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </article>
  );
}

function DetailHeading({ index, title }: { index: string; title: string }) {
  return (
    <Reveal className="flex items-baseline gap-4 border-b border-line pb-5">
      <span className="text-sm font-semibold text-sun-deep tabular-nums">{index}</span>
      <h2 className="text-3xl font-semibold tracking-tight text-navy-900 sm:text-4xl">{title}</h2>
    </Reveal>
  );
}
