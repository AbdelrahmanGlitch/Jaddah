"use client";

import Image from "next/image";
import { useState } from "react";
import { motion } from "framer-motion";
import { Expand } from "lucide-react";
import { useLang } from "@/lib/i18n";
import { cn } from "@/lib/cn";
import { gallery } from "@/data/gallery";
import { company } from "@/data/company";
import { FacebookIcon } from "@/components/ui/BrandIcons";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Lightbox } from "@/components/ui/Lightbox";

const aspect = { tall: "aspect-[3/4]", wide: "aspect-[4/3]", square: "aspect-square" } as const;

export function Gallery() {
  const { t, l } = useLang();
  const [open, setOpen] = useState<number | null>(null);

  return (
    <section id="gallery" className="grain relative overflow-hidden bg-navy-950 py-24 text-white sm:py-32">
      <div className="container-x relative">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <SectionHeading tone="dark" eyebrow={t.gallery.eyebrow} title={t.gallery.title} text={t.gallery.text} />
          <a href={company.facebook.url} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-xs tracking-[0.12em] text-white/55 transition hover:text-white">
            <FacebookIcon className="size-4" />
            {t.gallery.note}
          </a>
        </div>

        <div className="mt-14 columns-2 gap-3 sm:gap-4 lg:columns-3">
          {gallery.map((item, i) => (
            <motion.button
              key={item.src}
              type="button"
              onClick={() => setOpen(i)}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.9, delay: (i % 4) * 0.08, ease: [0.22, 1, 0.36, 1] }}
              className={cn("group relative mb-3 block w-full break-inside-avoid overflow-hidden rounded-md sm:mb-4", aspect[item.shape])}
              aria-label={l(item.alt)}
            >
              <Image src={item.src} alt={l(item.alt)} fill sizes="(max-width: 1024px) 50vw, 33vw" className="object-cover transition-transform duration-[1.6s] ease-(--ease-premium) group-hover:scale-105" />
              <div className="absolute inset-0 bg-navy-950/0 transition-colors duration-500 group-hover:bg-navy-950/40" />
              <span className="absolute start-3 bottom-3 rounded-full bg-navy-950/50 px-3 py-1 text-[10.5px] font-semibold tracking-[0.14em] text-white uppercase ring-1 ring-white/15 backdrop-blur-md">
                {l(item.category)}
              </span>
              <span className="absolute end-3 top-3 grid size-9 place-items-center rounded-full bg-white/15 text-white opacity-0 backdrop-blur-md transition-all duration-500 group-hover:opacity-100">
                <Expand className="size-4" />
              </span>
            </motion.button>
          ))}
        </div>
      </div>

      <Lightbox items={gallery.map((g) => ({ src: g.src, alt: l(g.alt), caption: `${l(g.category)} — ${l(g.alt)}` }))} index={open} onChange={setOpen} />
    </section>
  );
}
