"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight, CalendarDays, Clock3, MapPin } from "lucide-react";
import { useLang } from "@/lib/i18n";
import { cn } from "@/lib/cn";
import type { Trip } from "@/lib/types";
import { AvailabilityBadge, Price, ServiceList, cardFacts, durationLabel } from "./TripMeta";

type Props = { trip: Trip; className?: string; priority?: boolean };

export function TripCard({ trip, className, priority }: Props) {
  const { t, l, lang } = useLang();
  const href = `/trips/${trip.id}`;
  const duration = durationLabel(trip, lang);
  const facts = cardFacts(trip, t, lang, l);

  return (
    <article
      className={cn(
        "group relative flex h-full flex-col overflow-hidden rounded-lg bg-white shadow-[0_1px_0_rgba(11,31,51,0.06),0_20px_50px_-30px_rgba(11,31,51,0.35)] ring-1 ring-navy-900/5 transition-all duration-700 ease-(--ease-premium) hover:-translate-y-1.5 hover:shadow-[0_40px_80px_-40px_rgba(11,31,51,0.55)]",
        className,
      )}
    >
      {/* Photo */}
      <Link href={href} className="relative block aspect-[4/4.2] overflow-hidden" aria-label={l(trip.title)}>
        <Image
          src={trip.heroImage}
          alt={`${l(trip.title)} — ${l(trip.destination)}`}
          fill
          sizes="(max-width: 640px) 85vw, (max-width: 1024px) 45vw, 30vw"
          className="object-cover transition-transform duration-[1.6s] ease-(--ease-premium) group-hover:scale-[1.07]"
          preload={priority}
        />
        <div className="absolute inset-0 bg-linear-to-t from-navy-950/85 via-navy-950/10 to-navy-950/30" />

        <div className="absolute inset-x-0 top-0 flex items-start justify-between gap-2 p-4">
          <span className="rounded-full bg-white/90 px-3 py-1 text-[11px] font-semibold tracking-wide text-navy-900 backdrop-blur">
            {t.categories[trip.categories[0]]}
          </span>
          {trip.availability && <AvailabilityBadge availability={trip.availability} />}
        </div>

        <div className="absolute inset-x-0 bottom-0 p-5 text-white sm:p-6">
          <p className="flex items-center gap-1.5 text-[11px] font-semibold tracking-[0.22em] text-sand uppercase">
            <MapPin className="size-3.5 text-gold" strokeWidth={2} />
            {l(trip.country)} · {l(trip.destination)}
          </p>
          <h3 className="mt-2 text-2xl leading-tight font-semibold tracking-tight text-balance">{l(trip.title)}</h3>
          {duration && (
            <p className="mt-2 flex items-center gap-1.5 text-sm text-white/80">
              <Clock3 className="size-4 text-teal" strokeWidth={1.8} />
              {duration}
            </p>
          )}
        </div>
      </Link>

      {/* Details */}
      <div className="flex flex-1 flex-col p-5 sm:p-6">
        <p className="line-clamp-2 text-sm leading-relaxed text-muted">{l(trip.shortDescription)}</p>

        {facts.length > 0 && (
          <div className={cn("mt-5 grid divide-x divide-line rounded-md border border-line text-sm rtl:divide-x-reverse", facts.length === 2 ? "grid-cols-2" : "grid-cols-1")}>
            {facts.map((f) => (
              <div key={f.label} className="px-3.5 py-2.5">
                <p className="text-[10.5px] font-medium tracking-[0.14em] text-muted uppercase">{f.label}</p>
                <p className="mt-0.5 flex items-center gap-1.5 font-semibold text-navy-900">
                  <CalendarDays className="size-3.5 shrink-0 text-ocean" strokeWidth={1.8} />
                  {f.value}
                </p>
              </div>
            ))}
          </div>
        )}

        <div className="mt-4 mb-6">
          <ServiceList services={trip.services} max={4} />
        </div>

        <div className="mt-auto flex items-end justify-between gap-4 border-t border-line pt-5">
          <Price trip={trip} />
          <Link
            href={href}
            className="btn btn-dark shrink-0 px-5 py-3 text-[13px] group-hover:bg-ocean"
          >
            {t.trips.viewTrip}
            <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5 rtl:-scale-x-100 rtl:group-hover:-translate-x-0.5" />
          </Link>
        </div>
      </div>
    </article>
  );
}
