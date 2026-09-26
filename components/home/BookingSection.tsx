"use client";

import Image from "next/image";
import { CheckCircle2, Phone } from "lucide-react";
import { useLang } from "@/lib/i18n";
import { images } from "@/data/images";
import { chatLink, company } from "@/data/company";
import { BookingForm } from "@/components/booking/BookingForm";
import { WhatsAppIcon } from "@/components/ui/BrandIcons";
import { Reveal } from "@/components/ui/Reveal";

export function BookingSection() {
  const { t } = useLang();

  return (
    <section id="booking" className="relative isolate overflow-hidden bg-navy-950 py-24 sm:py-32">
      <Image src={images.gewanResort} alt="" fill sizes="100vw" className="-z-10 object-cover opacity-30 blur-[2px]" />
      <div className="absolute inset-0 -z-10 bg-linear-to-br from-navy-950 via-navy-950/90 to-navy-900/80" />

      <div className="container-x grid gap-12 lg:grid-cols-12 lg:gap-16">
        <div className="text-white lg:col-span-5 lg:pt-6">
          <Reveal>
            <span className="eyebrow text-sun">{t.booking.eyebrow}</span>
            <h2 className="heading-lg rtl-leading mt-5 text-balance">{t.booking.title}</h2>
            <p className="mt-6 text-base leading-relaxed text-white/70 sm:text-lg">{t.booking.text}</p>
          </Reveal>

          <Reveal delay={0.1}>
            <ul className="mt-10 space-y-4">
              {t.booking.points.map((p) => (
                <li key={p} className="flex items-start gap-3 text-[15px] text-white/85">
                  <CheckCircle2 className="mt-0.5 size-5 shrink-0 text-sun" strokeWidth={1.6} />
                  {p}
                </li>
              ))}
            </ul>
          </Reveal>

          <Reveal delay={0.2}>
            <div className="mt-12 rounded-2xl border border-white/10 bg-white/[0.06] p-6 backdrop-blur-md">
              <p className="text-lg font-semibold">{t.booking.preferWhatsapp}</p>
              <p className="mt-1 text-sm text-white/60">{t.booking.preferWhatsappText}</p>
              <ul className="mt-5 grid grid-cols-2 gap-2">
                {company.bookingLines.map((n) => (
                  <li key={n}>
                    <a href={`tel:${n}`} dir="ltr" className="flex items-center justify-center gap-2 rounded-full bg-white/10 px-3 py-2.5 text-sm font-semibold tabular-nums ring-1 ring-white/10 transition hover:bg-white/20">
                      <Phone className="size-3.5 text-sun" />
                      {n}
                    </a>
                  </li>
                ))}
              </ul>
              <a href={chatLink().href} target="_blank" rel="noopener noreferrer" className="btn btn-whatsapp mt-4 w-full">
                <WhatsAppIcon className="size-5" />
                {t.booking.chat}
              </a>
            </div>
          </Reveal>
        </div>

        <Reveal delay={0.1} className="lg:col-span-7">
          <div className="rounded-2xl bg-white p-6 shadow-[0_50px_100px_-40px_rgba(0,0,0,0.6)] sm:p-10">
            <BookingForm />
          </div>
        </Reveal>
      </div>
    </section>
  );
}
