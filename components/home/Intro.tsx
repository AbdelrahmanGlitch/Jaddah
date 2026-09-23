"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { useLang } from "@/lib/i18n";
import { company } from "@/data/company";
import { images } from "@/data/images";
import { ImageReveal, Reveal } from "@/components/ui/Reveal";

export function Intro() {
  const { t, l } = useLang();
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const smallY = useTransform(scrollYProgress, [0, 1], ["30%", "-30%"]);

  return (
    <section id="about" ref={ref} className="relative overflow-hidden py-24 sm:py-32 lg:py-40">
      <div className="container-x grid items-center gap-16 lg:grid-cols-12 lg:gap-12">
        {/* Imagery */}
        <div className="relative lg:col-span-6">
          <ImageReveal className="relative aspect-[4/5] overflow-hidden rounded-lg sm:aspect-[5/6] lg:me-16">
            <Image src={images.makkahPilgrimPhotographing} alt="" fill sizes="(max-width: 1024px) 100vw, 45vw" className="object-cover" />
            <div className="absolute inset-0 bg-linear-to-t from-navy-950/40 to-transparent" />
          </ImageReveal>

          <motion.div
            style={{ y: smallY }}
            className="absolute -bottom-10 end-0 hidden w-[46%] overflow-hidden rounded-lg border-[6px] border-mist shadow-2xl shadow-navy-900/20 sm:block"
          >
            <div className="relative aspect-[4/5]">
              <Image src={images.matrouhCleopatraFamilies} alt="" fill sizes="25vw" className="object-cover" />
            </div>
          </motion.div>

          <div className="absolute start-6 top-6 hidden rounded-full bg-white/90 px-4 py-2 text-[11px] font-semibold tracking-[0.2em] text-navy-900 uppercase backdrop-blur sm:block">
            {l({ en: "Explore · Discover · Remember", ar: "استكشف · اكتشف · تذكّر" })}
          </div>
        </div>

        {/* Copy */}
        <div className="lg:col-span-6 lg:ps-8">
          <Reveal>
            <span className="eyebrow text-ocean">{t.intro.eyebrow}</span>
            <h2 className="heading-xl rtl-leading mt-6 text-balance text-navy-900">{t.intro.title}</h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mt-8 text-lg leading-relaxed text-ink/80 sm:text-xl">{t.intro.lead}</p>
            {/* Company description — built from verified company data (see data/company.ts) */}
            <p className="mt-5 text-base leading-relaxed text-muted">{l(company.description)}</p>
          </Reveal>

          <Reveal delay={0.2}>
            <ul className="mt-12 grid gap-px overflow-hidden rounded-lg bg-line sm:grid-cols-3">
              {t.intro.pillars.map((p, i) => (
                <li key={p.title} className="bg-mist p-5 sm:p-6">
                  <span className="text-xs font-semibold text-gold tabular-nums">0{i + 1}</span>
                  <p className="mt-3 font-semibold text-navy-900">{p.title}</p>
                  <p className="mt-1.5 text-sm leading-relaxed text-muted">{p.text}</p>
                </li>
              ))}
            </ul>
          </Reveal>

          <Reveal delay={0.3}>
            <Link href="/trips" className="btn btn-outline mt-10">
              {t.intro.cta}
              <ArrowRight className="size-4 rtl:-scale-x-100" />
            </Link>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
