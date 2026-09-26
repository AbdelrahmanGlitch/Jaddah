"use client";

import Image from "next/image";
import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Building2, PhoneCall, WalletCards } from "lucide-react";
import { useLang } from "@/lib/i18n";
import { chatLink, company } from "@/data/company";
import { images } from "@/data/images";
import { LogoMark } from "@/components/brand/LogoMark";
import { WhatsAppIcon } from "@/components/ui/BrandIcons";
import { ImageReveal, Reveal } from "@/components/ui/Reveal";

export function Intro() {
  const { t, l } = useLang();
  const ref = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const smallY = useTransform(scrollYProgress, [0, 1], ["25%", "-25%"]);

  const pillars = [
    { icon: Building2, title: t.about.offices, lines: company.offices.map((o) => `${l(o.city)} — ${l(o.address)}`) },
    { icon: WalletCards, title: t.about.payment, lines: [company.payment.map(l).join(" · ")] },
    { icon: PhoneCall, title: t.about.booking, lines: [t.about.bookingText] },
  ];

  return (
    <section id="about" ref={ref} className="relative overflow-hidden bg-mist py-24 sm:py-32">
      <div className="container-x grid items-center gap-16 lg:grid-cols-12 lg:gap-12">
        {/* Copy */}
        <div className="lg:col-span-6 lg:pe-8">
          <Reveal>
            <span className="eyebrow text-ocean">{t.about.eyebrow}</span>
            <h2 className="heading-xl rtl-leading mt-6 text-balance text-navy-900">{t.about.title}</h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p className="mt-8 text-lg leading-relaxed text-ink/80 sm:text-xl">{t.about.lead}</p>
          </Reveal>

          <Reveal delay={0.2}>
            <ul className="mt-10 grid gap-px overflow-hidden rounded-lg bg-line">
              {pillars.map(({ icon: Icon, title, lines }) => (
                <li key={title} className="flex gap-4 bg-white p-5 sm:p-6">
                  <span className="grid size-11 shrink-0 place-items-center rounded-full bg-sand-50 text-sun-deep ring-1 ring-sun/30">
                    <Icon className="size-5" strokeWidth={1.6} />
                  </span>
                  <div>
                    <p className="font-semibold text-navy-900">{title}</p>
                    {lines.map((line) => (
                      <p key={line} className="mt-1 text-[15px] leading-relaxed text-muted">
                        {line}
                      </p>
                    ))}
                  </div>
                </li>
              ))}
            </ul>
          </Reveal>

          <Reveal delay={0.3}>
            <a href={chatLink().href} target="_blank" rel="noopener noreferrer" className="btn btn-dark mt-10">
              <WhatsAppIcon className="size-4" />
              {t.about.cta}
            </a>
          </Reveal>
        </div>

        {/* Imagery — Lavie's own offer photos */}
        <div className="relative lg:col-span-6">
          <ImageReveal className="relative aspect-[4/5] overflow-hidden rounded-2xl sm:aspect-[5/6] lg:ms-12">
            <Image src={images.gewanResort} alt={l({ en: "Gewan, New Alamein", ar: "جيوان، العلمين الجديدة" })} fill sizes="(max-width: 1024px) 100vw, 45vw" className="object-cover" />
            <div className="absolute inset-0 bg-linear-to-t from-navy-950/45 to-transparent" />
          </ImageReveal>

          <motion.div
            style={{ y: smallY }}
            className="absolute -bottom-10 start-0 hidden w-[42%] overflow-hidden rounded-2xl border-[6px] border-mist shadow-2xl shadow-navy-900/20 sm:block"
          >
            <div className="relative aspect-[4/5]">
              <Image src={images.dayzUmbrellas} alt={l({ en: "Dayz Inn Alamein beach", ar: "شاطئ Dayz Inn العلمين" })} fill sizes="25vw" className="object-cover" />
            </div>
          </motion.div>

          <div className="absolute end-5 top-5 flex items-center gap-3 rounded-full bg-white/95 py-1.5 ps-1.5 pe-4 shadow-lg backdrop-blur">
            <LogoMark className="size-10" />
            <span className="text-sm font-semibold text-navy-900" dir="ltr">
              LAVIE TOURS
            </span>
          </div>
        </div>
      </div>
    </section>
  );
}
