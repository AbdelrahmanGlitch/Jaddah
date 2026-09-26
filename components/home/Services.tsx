"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowLeft, BedDouble, CreditCard, Landmark, MapPinned, Plane, Smartphone, type LucideIcon } from "lucide-react";
import { useLang } from "@/lib/i18n";
import { company } from "@/data/company";
import { services, type ServiceId } from "@/data/content";
import { requestBooking } from "@/lib/booking";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Reveal";

const icons: Record<ServiceId, LucideIcon> = { domestic: MapPinned, hotels: BedDouble, flights: Plane };
const paymentIcons: LucideIcon[] = [Landmark, Smartphone, Smartphone, CreditCard];

export function Services() {
  const { t, l } = useLang();

  return (
    <section id="services" className="relative bg-white py-24 sm:py-32">
      <div className="container-x">
        <SectionHeading eyebrow={t.servicesSection.eyebrow} title={t.servicesSection.title} text={t.servicesSection.text} />

        <div className="mt-14 grid gap-5 md:grid-cols-3">
          {services.map((s, i) => {
            const Icon = icons[s.id];
            const inner = (
              <>
                <div className="relative h-52 overflow-hidden">
                  {s.image ? (
                    <>
                      <Image src={s.image} alt={l(s.title)} fill sizes="(max-width: 768px) 100vw, 33vw" className="object-cover transition-transform duration-[1.6s] ease-(--ease-premium) group-hover:scale-105" />
                      <div className="absolute inset-0 bg-linear-to-t from-navy-950/50 to-transparent" />
                    </>
                  ) : (
                    <FlightArt />
                  )}
                  <span className="absolute start-5 bottom-5 grid size-12 place-items-center rounded-full bg-white text-ocean shadow-lg">
                    <Icon className="size-5" strokeWidth={1.6} />
                  </span>
                </div>
                <div className="flex flex-1 flex-col p-6 sm:p-7">
                  <h3 className="font-display text-xl font-semibold text-navy-900">{l(s.title)}</h3>
                  <p className="mt-3 flex-1 text-[15px] leading-relaxed text-muted">{l(s.text)}</p>
                  <span className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-ocean">
                    {l(s.cta)}
                    <ArrowLeft className="size-4 transition-transform group-hover:-translate-x-1 ltr:-scale-x-100 ltr:group-hover:translate-x-1" />
                  </span>
                </div>
              </>
            );
            const cardClass =
              "group flex h-full flex-col overflow-hidden rounded-2xl bg-mist text-start ring-1 ring-navy-900/5 transition-all duration-500 hover:-translate-y-1 hover:bg-white hover:shadow-[0_40px_80px_-40px_rgba(12,33,48,0.45)]";
            return (
              <motion.div
                key={s.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.8, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] }}
              >
                {s.bookingType ? (
                  <button type="button" onClick={() => requestBooking({ type: s.bookingType })} className={cardClass + " w-full"}>
                    {inner}
                  </button>
                ) : (
                  <Link href={s.href} className={cardClass}>
                    {inner}
                  </Link>
                )}
              </motion.div>
            );
          })}
        </div>

        {/* Payment methods (from Lavie's posts) */}
        <Reveal delay={0.1} className="mt-6">
          <div className="flex flex-col gap-5 rounded-2xl bg-navy-900 p-6 text-white sm:p-8 lg:flex-row lg:items-center lg:justify-between">
            <p className="font-display text-lg font-semibold">{t.servicesSection.paymentTitle}</p>
            <ul className="flex flex-wrap gap-2.5">
              {company.payment.map((p, i) => {
                const Icon = paymentIcons[i] ?? Smartphone;
                return (
                  <li key={p.en} className="flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-sm font-medium ring-1 ring-white/15">
                    <Icon className="size-4 text-sun" strokeWidth={1.8} />
                    {l(p)}
                  </li>
                );
              })}
            </ul>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/** Sky tile with the logo's plane and a dashed flight path — no photo claims. */
function FlightArt() {
  return (
    <div className="absolute inset-0 bg-wave">
      <div className="absolute -top-10 -end-10 size-48 rounded-full bg-sun/90" />
      <svg viewBox="0 0 400 210" className="absolute inset-0 size-full" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
        <path d="M30 180 C 120 60, 260 40, 360 70" fill="none" stroke="white" strokeOpacity="0.8" strokeWidth="2.5" strokeDasharray="6 9" strokeLinecap="round" />
        <path d="M0 200 C 100 170, 220 190, 400 160 V210 H0Z" fill="white" fillOpacity="0.18" />
      </svg>
      <Plane className="absolute end-[14%] top-[22%] size-10 -rotate-12 text-white rtl:-scale-x-100" strokeWidth={1.4} />
    </div>
  );
}
