"use client";

import Image from "next/image";
import { CheckCircle2 } from "lucide-react";
import { useLang } from "@/lib/i18n";
import { images } from "@/data/images";
import { chatLink } from "@/data/company";
import { BookingForm } from "@/components/booking/BookingForm";
import { ChatIcon } from "@/components/ui/ChatIcon";
import { Reveal } from "@/components/ui/Reveal";

export function BookingSection() {
  const { t } = useLang();

  return (
    <section id="booking" className="relative isolate overflow-hidden bg-navy-950 py-24 sm:py-32">
      <Image src={images.matrouhTurquoise} alt="" fill sizes="100vw" className="-z-10 object-cover opacity-40" />
      <div className="absolute inset-0 -z-10 bg-linear-to-br from-navy-950 via-navy-950/85 to-navy-900/70" />

      <div className="container-x grid gap-12 lg:grid-cols-12 lg:gap-16">
        <div className="text-white lg:col-span-5 lg:pt-6">
          <Reveal>
            <span className="eyebrow text-sand/80">{t.booking.eyebrow}</span>
            <h2 className="heading-lg rtl-leading mt-5 text-balance">{t.booking.title}</h2>
            <p className="mt-6 text-base leading-relaxed text-white/70 sm:text-lg">{t.booking.text}</p>
          </Reveal>

          <Reveal delay={0.1}>
            <ul className="mt-10 space-y-4">
              {t.booking.points.map((p) => (
                <li key={p} className="flex items-center gap-3 text-[15px] text-white/85">
                  <CheckCircle2 className="size-5 shrink-0 text-teal" strokeWidth={1.6} />
                  {p}
                </li>
              ))}
            </ul>
          </Reveal>

          <Reveal delay={0.2}>
            <div className="mt-12 rounded-lg border border-white/10 bg-white/[0.06] p-6 backdrop-blur-md">
              <p className="text-lg font-semibold">{chatLink().channel === "whatsapp" ? t.booking.preferWhatsapp : t.booking.preferChat}</p>
              <p className="mt-1 text-sm text-white/60">{t.booking.preferWhatsappText}</p>
              <a href={chatLink().href} target="_blank" rel="noopener noreferrer" className={`btn mt-5 ${chatLink().channel === "whatsapp" ? "bg-[#25D366] text-navy-950 hover:-translate-y-0.5 hover:bg-[#3be07a]" : "btn-primary"}`}>
                <ChatIcon className="size-5" />
                {t.booking.chat}
              </a>
            </div>
          </Reveal>
        </div>

        <Reveal delay={0.1} className="lg:col-span-7">
          <div className="rounded-xl bg-white p-6 shadow-[0_50px_100px_-40px_rgba(0,0,0,0.6)] sm:p-10">
            <BookingForm />
          </div>
        </Reveal>
      </div>
    </section>
  );
}
