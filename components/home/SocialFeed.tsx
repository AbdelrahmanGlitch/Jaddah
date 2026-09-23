"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowUpRight, Heart, MessageCircle } from "lucide-react";
import { useLang } from "@/lib/i18n";
import { company } from "@/data/company";
import { socialPosts } from "@/data/content";
import { FacebookIcon } from "@/components/ui/BrandIcons";
import { LogoMark } from "@/components/brand/LogoMark";
import { Reveal } from "@/components/ui/Reveal";

export function SocialFeed() {
  const { t, l } = useLang();

  return (
    <section className="relative bg-mist py-24 sm:py-32">
      <div className="container-x grid gap-12 lg:grid-cols-12 lg:gap-16">
        {/* Page card */}
        <div className="lg:col-span-4">
          <Reveal className="lg:sticky lg:top-32">
            <span className="eyebrow text-ocean">{t.social.eyebrow}</span>
            <h2 className="heading-lg rtl-leading mt-5 text-navy-900">{t.social.title}</h2>
            <p className="mt-5 text-base leading-relaxed text-muted sm:text-lg">{t.social.text}</p>

            <div className="mt-10 flex items-center gap-4 rounded-lg border border-line bg-white p-4">
              <LogoMark withText={false} className="size-14 shrink-0" />
              <div className="min-w-0">
                <p className="font-semibold text-navy-900">{l(company.displayName)}</p>
                <p className="truncate text-sm text-muted" dir="ltr">
                  {t.social.handle}
                </p>
              </div>
              <FacebookIcon className="ms-auto size-6 shrink-0 text-[#1877F2]" />
            </div>

            <a href={company.facebook.photosUrl} target="_blank" rel="noopener noreferrer" className="btn btn-dark mt-4 w-full py-4">
              <FacebookIcon className="size-4" />
              {t.social.cta}
              <ArrowUpRight className="size-4 rtl:-scale-x-100" />
            </a>
          </Reveal>
        </div>

        {/* Feed grid */}
        <div className="grid grid-cols-2 gap-2 sm:grid-cols-4 sm:gap-3 lg:col-span-8">
          {socialPosts.map((post, i) => (
            <motion.a
              key={i}
              href={company.facebook.photosUrl}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, scale: 0.94 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.7, delay: (i % 4) * 0.06, ease: [0.22, 1, 0.36, 1] }}
              className={`group relative aspect-square overflow-hidden rounded-md ${i === 0 ? "sm:col-span-2 sm:row-span-2" : ""} ${i === 8 ? "max-sm:hidden" : ""}`}
            >
              <Image src={post.image} alt={l(post.caption)} fill sizes="(max-width: 640px) 50vw, 25vw" className="object-cover transition-transform duration-[1.4s] ease-(--ease-premium) group-hover:scale-110" />
              <div className="absolute inset-0 flex flex-col justify-end bg-linear-to-t from-navy-950/85 via-navy-950/20 to-transparent p-4 opacity-0 transition-opacity duration-500 group-hover:opacity-100">
                <p className="line-clamp-2 text-sm font-medium text-white">{l(post.caption)}</p>
                <p className="mt-2 flex items-center gap-3 text-white/80">
                  <Heart className="size-4" />
                  <MessageCircle className="size-4" />
                </p>
              </div>
              <FacebookIcon className="absolute end-2.5 top-2.5 size-4 text-white/80 drop-shadow" />
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
}
