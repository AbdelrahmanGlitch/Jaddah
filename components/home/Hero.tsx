"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowLeft, BedDouble, MapPin, Phone, Plane, Sun } from "lucide-react";
import { useLang } from "@/lib/i18n";
import { chatLink, company } from "@/data/company";
import { images } from "@/data/images";
import { FacebookIcon, WhatsAppIcon } from "@/components/ui/BrandIcons";
import type { Localized } from "@/lib/types";

const ease = [0.22, 1, 0.36, 1] as const;

/** Story-style cards — real photos/video frames from Lavie's Facebook offer posts. */
const stories: { image: string; href: string; hotel: Localized; place: Localized; objectPosition?: string }[] = [
  {
    image: images.tulipAquaPark,
    href: "/trips/tolip-galala-heights-sokhna",
    hotel: { en: "Tolip Galala Heights", ar: "توليب الجلالة هايتس" },
    place: { en: "Ain Sokhna", ar: "العين السخنة" },
    objectPosition: "50% 70%",
  },
  {
    image: images.gewanPool,
    href: "/trips/gewan-new-alamein",
    hotel: { en: "Gewan", ar: "جيوان" },
    place: { en: "New Alamein", ar: "العلمين الجديدة" },
  },
  {
    image: images.dayzBeachSunset,
    href: "/trips/dayz-inn-alamein",
    hotel: { en: "Dayz Inn", ar: "Dayz Inn" },
    place: { en: "New Alamein", ar: "العلمين الجديدة" },
  },
];

export function Hero() {
  const { t, lang } = useLang();
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const sunY = useTransform(scrollYProgress, [0, 1], ["0%", "35%"]);
  const cardsY = useTransform(scrollYProgress, [0, 1], ["0%", "-10%"]);

  const chipIcons = [MapPin, BedDouble, Plane];
  const wa = chatLink(lang === "ar" ? "أهلاً LAVIE TOURS، عايز أستفسر عن الحجز." : "Hello LAVIE TOURS, I'd like to ask about a booking.");

  return (
    <section ref={ref} className="relative isolate overflow-hidden bg-sand-50 pt-28 sm:pt-32">
      {/* Sun from the logo */}
      <motion.div
        style={{ y: sunY }}
        className="pointer-events-none absolute -top-24 -z-10 size-[30rem] rounded-full bg-sun/25 blur-[2px] end-[-8rem] sm:size-[40rem] lg:end-[4%] lg:top-[-6rem]"
        aria-hidden="true"
      />
      <div className="pointer-events-none absolute top-40 -z-10 size-72 rounded-full bg-wave/10 start-[-6rem]" aria-hidden="true" />

      <div className="container-x relative grid items-center gap-14 pb-28 lg:grid-cols-12 lg:gap-8 lg:pb-40">
        {/* Copy */}
        <div className="lg:col-span-6 xl:col-span-6">
          <motion.span initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1, duration: 0.8, ease }} className="eyebrow text-sun-deep">
            {t.hero.eyebrow}
          </motion.span>

          <h1 className="rtl-leading mt-6 text-[clamp(2.8rem,7.4vw,5.6rem)] leading-[1.02] font-bold tracking-[-0.035em] text-navy-900">
            {[t.hero.titleA, t.hero.titleB].map((line, i) => (
              <span key={`${lang}-${i}`} className="block overflow-hidden pb-[0.1em]">
                <motion.span
                  className={i === 1 ? "block text-ocean" : "block"}
                  initial={{ y: "110%" }}
                  animate={{ y: 0 }}
                  transition={{ delay: 0.25 + i * 0.12, duration: 1.05, ease }}
                >
                  {line}
                </motion.span>
              </span>
            ))}
          </h1>

          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6, duration: 0.9, ease }} className="mt-6 max-w-xl text-lg leading-relaxed text-ink/75">
            {t.hero.text}
          </motion.p>

          <motion.ul initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.7, duration: 0.9, ease }} className="mt-7 flex flex-wrap gap-2">
            {t.hero.chips.map((chip, i) => {
              const Icon = chipIcons[i];
              return (
                <li key={chip} className="flex items-center gap-2 rounded-full bg-white px-4 py-2 text-sm font-medium text-navy-900 shadow-[0_6px_20px_-12px_rgba(12,33,48,0.35)] ring-1 ring-navy-900/5">
                  <Icon className="size-4 text-wave" strokeWidth={1.8} />
                  {chip}
                </li>
              );
            })}
          </motion.ul>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.85, duration: 0.9, ease }} className="mt-9 flex flex-col gap-3 sm:flex-row">
            <a href={wa.href} target="_blank" rel="noopener noreferrer" className="btn btn-whatsapp px-8 py-4 text-[15px]">
              <WhatsAppIcon className="size-5" />
              {t.hero.cta1}
            </a>
            <Link href="/trips" className="btn btn-outline bg-white px-8 py-4 text-[15px]">
              {t.hero.cta2}
              <ArrowLeft className="size-4 ltr:-scale-x-100" />
            </Link>
          </motion.div>

          <motion.a
            href={`tel:${company.bookingLines[0]}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.05, duration: 0.9 }}
            className="group mt-8 inline-flex items-center gap-3 text-sm text-muted"
          >
            <span className="grid size-10 place-items-center rounded-full bg-navy-900 text-white transition group-hover:bg-ocean">
              <Phone className="size-4" />
            </span>
            <span>
              <span className="block text-xs">{t.hero.bookingLine}</span>
              <span className="block text-base font-semibold text-navy-900 tabular-nums" dir="ltr">
                {company.bookingLines[0]}
              </span>
            </span>
          </motion.a>
        </div>

        {/* Story cards */}
        <motion.div style={{ y: cardsY }} className="relative mx-auto h-[440px] w-full max-w-[520px] sm:h-[540px] lg:col-span-6 lg:h-[620px] lg:max-w-none">
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2, duration: 0.8 }}
            className="absolute top-0 start-0 z-30 flex items-center gap-2 rounded-full bg-white/90 px-3.5 py-1.5 text-xs font-semibold text-navy-900 shadow-sm backdrop-blur"
          >
            <FacebookIcon className="size-3.5 text-[#1877F2]" />
            {t.hero.fromFacebook}
          </motion.p>

          <StoryCard story={stories[0]} className="absolute top-8 end-[4%] z-20 h-[88%] w-[56%] lg:w-[50%]" rotate={2.5} delay={0.4} preload />
          <StoryCard story={stories[1]} className="absolute top-[22%] start-[2%] z-10 h-[64%] w-[40%] lg:w-[36%]" rotate={-4} delay={0.6} />
          <StoryCard story={stories[2]} className="absolute bottom-[-2%] start-[30%] z-30 h-[40%] w-[27%] lg:start-[34%] lg:w-[23%]" rotate={-1.5} delay={0.8} small />

          <motion.span
            initial={{ opacity: 0, scale: 0.6 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 1.1, duration: 0.8, ease }}
            className="absolute top-[12%] start-[36%] z-30 grid size-14 place-items-center rounded-full bg-sun text-navy-950 shadow-lg lg:size-16"
            aria-hidden="true"
          >
            <Sun className="size-7" strokeWidth={1.6} />
          </motion.span>
        </motion.div>
      </div>

      {/* Waves from the logo */}
      <svg className="absolute inset-x-0 bottom-0 -z-10 h-24 w-full sm:h-32" viewBox="0 0 1440 140" preserveAspectRatio="none" aria-hidden="true">
        <path d="M0 70C180 20 360 20 540 60C720 100 900 110 1080 80C1260 50 1350 40 1440 50V140H0Z" className="fill-wave/15" />
        <path d="M0 100C200 70 380 70 560 95C740 120 940 125 1120 105C1260 90 1360 85 1440 90V140H0Z" className="fill-wave/30" />
        <path d="M0 125C240 110 480 108 720 118C960 128 1200 130 1440 120V140H0Z" className="fill-mist" />
      </svg>
    </section>
  );
}

function StoryCard({
  story,
  className,
  rotate,
  delay,
  preload,
  small,
}: {
  story: (typeof stories)[number];
  className: string;
  rotate: number;
  delay: number;
  preload?: boolean;
  small?: boolean;
}) {
  const { l } = useLang();
  return (
    <motion.div initial={{ opacity: 0, y: 40, rotate: 0 }} animate={{ opacity: 1, y: 0, rotate }} transition={{ delay, duration: 1.1, ease }} className={className}>
      <Link
        href={story.href}
        className="group relative block h-full overflow-hidden rounded-2xl bg-navy-900 shadow-[0_40px_80px_-30px_rgba(12,33,48,0.55)] ring-4 ring-white"
        aria-label={`${l(story.hotel)} — ${l(story.place)}`}
      >
        <Image
          src={story.image}
          alt={`${l(story.hotel)} — ${l(story.place)}`}
          fill
          preload={preload}
          sizes="(max-width: 1024px) 50vw, 28vw"
          className="object-cover transition-transform duration-[1.6s] ease-(--ease-premium) group-hover:scale-105"
          style={{ objectPosition: story.objectPosition }}
        />
        <div className="absolute inset-0 bg-linear-to-t from-navy-950/75 via-transparent to-transparent" />
        <div className={small ? "absolute inset-x-0 bottom-0 p-2.5" : "absolute inset-x-0 bottom-0 p-4"}>
          <p className={small ? "truncate text-xs font-semibold text-white" : "font-display text-base font-semibold text-white sm:text-lg"}>{l(story.hotel)}</p>
          {!small && (
            <p className="mt-0.5 flex items-center gap-1 text-xs text-white/80">
              <MapPin className="size-3 text-sun" />
              {l(story.place)}
            </p>
          )}
        </div>
      </Link>
    </motion.div>
  );
}
