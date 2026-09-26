"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRight, Trophy } from "lucide-react";
import { useLang } from "@/lib/i18n";
import { company } from "@/data/company";
import { facebookPosts } from "@/data/content";
import { formatDate } from "@/lib/format";
import { FacebookIcon } from "@/components/ui/BrandIcons";
import { LogoMark } from "@/components/brand/LogoMark";
import { Reveal } from "@/components/ui/Reveal";

/** Latest posts from facebook.com/LAVIE55555, with a strong "follow us" CTA. */
export function SocialFeed() {
  const { t, l, lang } = useLang();

  return (
    <section id="facebook" className="relative bg-white py-24 sm:py-32">
      <div className="container-x grid gap-12 lg:grid-cols-12 lg:gap-16">
        {/* Page card */}
        <div className="lg:col-span-4">
          <Reveal className="lg:sticky lg:top-32">
            <span className="eyebrow text-ocean">{t.social.eyebrow}</span>
            <h2 className="heading-lg rtl-leading mt-5 text-balance text-navy-900">{t.social.title}</h2>
            <p className="mt-5 text-base leading-relaxed text-muted sm:text-lg">{t.social.text}</p>

            <div className="mt-10 flex items-center gap-4 rounded-2xl border border-line bg-mist p-4">
              <LogoMark withText className="size-16 shrink-0 ring-1 ring-line" />
              <div className="min-w-0">
                <p className="font-semibold text-navy-900" dir="ltr">
                  {company.pageName}
                </p>
                <p className="truncate text-sm text-muted" dir="ltr">
                  {t.social.handle}
                </p>
              </div>
              <FacebookIcon className="ms-auto size-7 shrink-0 text-[#1877F2]" />
            </div>

            <a href={company.facebook.url} target="_blank" rel="noopener noreferrer" className="btn mt-4 w-full bg-[#1877F2] py-4 text-white hover:-translate-y-0.5 hover:bg-[#166fe0]">
              <FacebookIcon className="size-5" />
              {t.social.cta}
              <ArrowUpRight className="size-4 rtl:-scale-x-100" />
            </a>
          </Reveal>
        </div>

        {/* Posts */}
        <div className="grid gap-5 sm:grid-cols-2 lg:col-span-8">
          {facebookPosts.map((post, i) => (
            <motion.article
              key={`${post.date}-${i}`}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.8, delay: (i % 2) * 0.08, ease: [0.22, 1, 0.36, 1] }}
              className="flex flex-col overflow-hidden rounded-2xl bg-white ring-1 ring-line transition-shadow duration-500 hover:shadow-[0_30px_60px_-35px_rgba(12,33,48,0.45)]"
            >
              {/* Post header — like a Facebook post */}
              <header className="flex items-center gap-3 p-4">
                <LogoMark className="size-10 shrink-0 ring-1 ring-line" />
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-semibold text-navy-900" dir="ltr">
                    {company.pageName}
                  </p>
                  <p className="text-xs text-muted">
                    {formatDate(post.date, lang, { day: "numeric", month: "long", year: "numeric" })} · {l(post.kind)}
                  </p>
                </div>
                <FacebookIcon className="size-5 shrink-0 text-[#1877F2]" />
              </header>

              {post.image ? (
                <div className="relative aspect-[4/3] overflow-hidden bg-mist">
                  <Image src={post.image} alt={l(post.text)} fill sizes="(max-width: 640px) 100vw, 30vw" className="object-cover" style={{ objectPosition: "50% 35%" }} />
                </div>
              ) : (
                <div className="relative grid aspect-[4/3] place-items-center overflow-hidden bg-navy-900 text-white">
                  <div className="absolute -top-16 -end-16 size-48 rounded-full bg-sun/80" />
                  <Trophy className="relative size-14 text-white" strokeWidth={1.2} />
                </div>
              )}

              <div className="flex flex-1 flex-col p-5">
                <p className="line-clamp-4 flex-1 text-[15px] leading-relaxed text-ink/80">{l(post.text)}</p>
                <div className="mt-5 flex items-center justify-between gap-3 border-t border-line pt-4 text-sm font-semibold">
                  <a href={company.facebook.url} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 text-[#1877F2] hover:underline">
                    {t.social.readOnFacebook}
                    <ArrowUpRight className="size-3.5 rtl:-scale-x-100" />
                  </a>
                  {post.tripId && (
                    <Link href={`/trips/${post.tripId}`} className="text-ocean hover:underline">
                      {t.social.viewOffer}
                    </Link>
                  )}
                </div>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
