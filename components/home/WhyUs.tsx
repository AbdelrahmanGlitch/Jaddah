"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { ClipboardCheck, Compass, Headset, SlidersHorizontal, Sparkles, Tag, type LucideIcon } from "lucide-react";
import { useLang } from "@/lib/i18n";
import { whyUs, type WhyUsIcon } from "@/data/content";
import { images } from "@/data/images";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ImageReveal } from "@/components/ui/Reveal";

const icons: Record<WhyUsIcon, LucideIcon> = {
  compass: Compass,
  clipboard: ClipboardCheck,
  tag: Tag,
  headset: Headset,
  sliders: SlidersHorizontal,
  sparkles: Sparkles,
};

export function WhyUs() {
  const { t, l } = useLang();

  return (
    <section id="why-us" className="relative bg-sand-50 py-24 sm:py-32">
      <div className="container-x grid gap-16 lg:grid-cols-12">
        <div className="lg:col-span-5">
          <div className="lg:sticky lg:top-32">
            <SectionHeading eyebrow={t.whyUs.eyebrow} title={t.whyUs.title} text={t.whyUs.text} />
            <ImageReveal className="relative mt-12 hidden aspect-[4/3] overflow-hidden rounded-lg lg:block">
              <Image src={images.haramPilgrimsRamadan} alt="" fill sizes="40vw" className="object-cover" />
              <div className="absolute inset-0 bg-linear-to-tr from-navy-900/30 to-transparent" />
            </ImageReveal>
          </div>
        </div>

        <div className="lg:col-span-7">
          <ul className="grid gap-px overflow-hidden rounded-lg bg-navy-900/10 sm:grid-cols-2">
            {whyUs.map((item, i) => {
              const Icon = icons[item.icon];
              return (
                <motion.li
                  key={item.icon}
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-40px" }}
                  transition={{ duration: 0.8, delay: (i % 2) * 0.1, ease: [0.22, 1, 0.36, 1] }}
                  className="group relative bg-sand-50 p-7 transition-colors duration-500 hover:bg-white sm:p-9"
                >
                  <span className="absolute inset-x-0 top-0 h-px origin-left scale-x-0 bg-gold transition-transform duration-700 ease-(--ease-premium) group-hover:scale-x-100 rtl:origin-right" />
                  <div className="flex items-start justify-between">
                    <span className="grid size-14 place-items-center rounded-full border border-navy-900/15 text-ocean transition-all duration-500 group-hover:border-ocean group-hover:bg-ocean group-hover:text-white">
                      <Icon className="size-6" strokeWidth={1.3} />
                    </span>
                    <span className="text-xs font-semibold text-navy-900/25 tabular-nums">0{i + 1}</span>
                  </div>
                  <h3 className="mt-8 text-xl font-semibold tracking-tight text-navy-900">{l(item.title)}</h3>
                  <p className="mt-3 text-[15px] leading-relaxed text-muted">{l(item.text)}</p>
                </motion.li>
              );
            })}
          </ul>
        </div>
      </div>
    </section>
  );
}
