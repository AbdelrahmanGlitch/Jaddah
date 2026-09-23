"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { useLang } from "@/lib/i18n";
import { images } from "@/data/images";

export function ListingHero() {
  const { t } = useLang();
  return (
    <section className="relative isolate overflow-hidden bg-navy-950 pt-40 pb-20 text-white sm:pt-48 sm:pb-28">
      <motion.div className="absolute inset-0 -z-10" initial={{ scale: 1.1 }} animate={{ scale: 1 }} transition={{ duration: 2.4, ease: [0.22, 1, 0.36, 1] }}>
        <Image src={images.matrouhRockySea} alt="" fill preload sizes="100vw" className="object-cover" />
      </motion.div>
      <div className="absolute inset-0 -z-10 bg-linear-to-t from-navy-950 via-navy-950/60 to-navy-950/40" />
      <div className="container-x">
        <motion.span initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8 }} className="eyebrow text-sand">
          {t.listing.eyebrow}
        </motion.span>
        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 1, ease: [0.22, 1, 0.36, 1] }}
          className="heading-xl rtl-leading mt-5 max-w-3xl text-balance"
        >
          {t.listing.title}
        </motion.h1>
        <motion.p initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.25, duration: 0.9 }} className="mt-5 max-w-xl text-lg text-white/70">
          {t.listing.text}
        </motion.p>
      </div>
    </section>
  );
}
