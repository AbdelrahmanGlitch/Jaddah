"use client";

import { useId, useState } from "react";
import { Plane, Users } from "lucide-react";
import { useLang } from "@/lib/i18n";
import { chatLink } from "@/data/company";
import { formatDate } from "@/lib/format";
import { requestBooking } from "@/lib/booking";
import { WhatsAppIcon } from "@/components/ui/BrandIcons";
import { Reveal } from "@/components/ui/Reveal";

/**
 * FLIGHT TICKETS — the page description confirms "حجز تذاكر طيران".
 * No airlines, routes or prices are claimed: the boarding-pass card just
 * writes the traveller's request into a WhatsApp message.
 */
export function Flights() {
  const { t, lang } = useLang();
  const uid = useId();
  const [trip, setTrip] = useState({ from: "", to: "", date: "", travelers: 1 });

  const labels =
    lang === "ar"
      ? { from: "من", to: "إلى", date: "تاريخ السفر", travelers: "المسافرين", fromPh: "القاهرة", toPh: "رايح فين؟", pass: "BOARDING PASS · طلب تذكرة" }
      : { from: "From", to: "To", date: "Travel date", travelers: "Travellers", fromPh: "Cairo", toPh: "Where to?", pass: "BOARDING PASS · Ticket request" };

  const message = [
    t.flights.waMessage,
    trip.from && `${labels.from}: ${trip.from}`,
    trip.to && `${labels.to}: ${trip.to}`,
    trip.date && `${labels.date}: ${formatDate(trip.date, lang)}`,
    `${labels.travelers}: ${trip.travelers}`,
  ]
    .filter(Boolean)
    .join("\n");

  const today = new Date().toISOString().slice(0, 10);

  return (
    <section id="flights" className="grain relative isolate overflow-hidden bg-navy-900 py-24 text-white sm:py-32">
      <div className="pointer-events-none absolute -top-32 -z-10 size-[34rem] rounded-full bg-wave/25 blur-[120px] end-[-10rem]" />
      <svg className="pointer-events-none absolute inset-0 -z-10 size-full opacity-30" viewBox="0 0 1440 600" preserveAspectRatio="none" aria-hidden="true">
        <path d="M-40 520 C 300 300, 700 180, 1480 120" fill="none" stroke="white" strokeOpacity="0.5" strokeWidth="1.5" strokeDasharray="4 12" />
      </svg>

      <div className="container-x grid items-center gap-14 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-5">
          <Reveal>
            <span className="eyebrow text-sun">{t.flights.eyebrow}</span>
            <h2 className="heading-lg rtl-leading mt-5 text-balance">{t.flights.title}</h2>
            <p className="mt-6 text-lg leading-relaxed text-white/70">{t.flights.text}</p>
          </Reveal>
          <Reveal delay={0.1}>
            <ol className="mt-10 space-y-4">
              {t.flights.steps.map((step, i) => (
                <li key={step} className="flex items-center gap-4 text-[15px] text-white/85">
                  <span className="grid size-9 shrink-0 place-items-center rounded-full bg-white/10 text-sm font-semibold text-sun ring-1 ring-white/15 tabular-nums">{i + 1}</span>
                  {step}
                </li>
              ))}
            </ol>
          </Reveal>
        </div>

        {/* Boarding-pass request card */}
        <Reveal delay={0.1} className="lg:col-span-7">
          <div className="overflow-hidden rounded-2xl bg-white text-ink shadow-[0_50px_100px_-40px_rgba(0,0,0,0.6)]">
            <div className="flex items-center justify-between gap-4 bg-wave px-6 py-4 text-white sm:px-8">
              <span className="text-xs font-semibold tracking-[0.2em]">{labels.pass}</span>
              <Plane className="size-5 rtl:-scale-x-100" strokeWidth={1.6} />
            </div>

            <div className="grid gap-5 p-6 sm:grid-cols-2 sm:p-8">
              <PassField id={`${uid}-from`} label={labels.from}>
                <input id={`${uid}-from`} className="field" placeholder={labels.fromPh} value={trip.from} onChange={(e) => setTrip((s) => ({ ...s, from: e.target.value }))} />
              </PassField>
              <PassField id={`${uid}-to`} label={labels.to}>
                <input id={`${uid}-to`} className="field" placeholder={labels.toPh} value={trip.to} onChange={(e) => setTrip((s) => ({ ...s, to: e.target.value }))} />
              </PassField>
              <PassField id={`${uid}-date`} label={labels.date}>
                <input id={`${uid}-date`} type="date" min={today} className="field" value={trip.date} onChange={(e) => setTrip((s) => ({ ...s, date: e.target.value }))} />
              </PassField>
              <PassField id={`${uid}-pax`} label={labels.travelers}>
                <div className="relative">
                  <Users className="pointer-events-none absolute top-1/2 size-4 -translate-y-1/2 text-muted start-4" />
                  <input
                    id={`${uid}-pax`}
                    type="number"
                    min={1}
                    max={50}
                    className="field ps-11"
                    value={trip.travelers}
                    onChange={(e) => setTrip((s) => ({ ...s, travelers: Math.min(50, Math.max(1, Number(e.target.value) || 1)) }))}
                  />
                </div>
              </PassField>
            </div>

            {/* Perforation */}
            <div className="relative mx-6 border-t-2 border-dashed border-line sm:mx-8">
              <span className="absolute -top-3 size-6 rounded-full bg-navy-900 -start-9 sm:-start-11" />
              <span className="absolute -top-3 size-6 rounded-full bg-navy-900 -end-9 sm:-end-11" />
            </div>

            <div className="flex flex-col gap-3 p-6 sm:flex-row sm:p-8">
              <a href={chatLink(message).href} target="_blank" rel="noopener noreferrer" className="btn btn-whatsapp flex-1 py-4">
                <WhatsAppIcon className="size-5" />
                {t.flights.ctaWhatsapp}
              </a>
              <button type="button" onClick={() => requestBooking({ type: "flight" })} className="btn btn-outline">
                {t.flights.ctaForm}
              </button>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function PassField({ id, label, children }: { id: string; label: string; children: React.ReactNode }) {
  return (
    <div>
      <label htmlFor={id} className="mb-2 block text-[11px] font-semibold tracking-[0.16em] text-muted uppercase">
        {label}
      </label>
      {children}
    </div>
  );
}
