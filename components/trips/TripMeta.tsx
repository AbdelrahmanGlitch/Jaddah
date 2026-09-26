"use client";

import { BedDouble, Bus, Compass, Plane, Ship, Stamp, UserRound, UtensilsCrossed, type LucideIcon } from "lucide-react";
import { useLang } from "@/lib/i18n";
import { cn } from "@/lib/cn";
import { countLabel, formatCurrencyLabel, formatDate, formatMonthDay, formatNumber } from "@/lib/format";
import { tripDepartures } from "@/data/trips";
import type { Dictionary } from "@/lib/dictionary";
import type { Availability, Lang, Localized, Trip, ServiceTag } from "@/lib/types";

export const serviceIcons: Record<ServiceTag, LucideIcon> = {
  flights: Plane,
  hotel: BedDouble,
  meals: UtensilsCrossed,
  transfers: Bus,
  tours: Compass,
  guide: UserRound,
  visa: Stamp,
  cruise: Ship,
};

export function ServiceList({ services, tone = "light", max = 5 }: { services: ServiceTag[]; tone?: "light" | "dark"; max?: number }) {
  const { t } = useLang();
  return (
    <ul className="flex flex-wrap gap-x-4 gap-y-2">
      {services.slice(0, max).map((s) => {
        const Icon = serviceIcons[s];
        return (
          <li key={s} className={cn("flex items-center gap-1.5 text-xs font-medium", tone === "dark" ? "text-white/70" : "text-muted")}>
            <Icon className={cn("size-3.5", tone === "dark" ? "text-sun" : "text-ocean")} strokeWidth={1.8} />
            {t.services[s]}
          </li>
        );
      })}
    </ul>
  );
}

const availabilityDot: Record<Availability, string> = {
  available: "bg-sun",
  limited: "bg-sun-deep",
  soldOut: "bg-white/50",
  onRequest: "bg-sand",
};

export function AvailabilityBadge({ availability, className }: { availability: Availability; className?: string }) {
  const { t } = useLang();
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full bg-navy-950/55 px-3 py-1 text-[11px] font-semibold tracking-wide text-white ring-1 ring-white/15 backdrop-blur-md ring-inset",
        className,
      )}
    >
      <span className={cn("size-1.5 rounded-full", availabilityDot[availability], availability === "limited" && "animate-pulse")} />
      {t.availability[availability]}
    </span>
  );
}

/** Price block: single price, "starting from", "prices vary by date" for schedules, or "price on request". */
export function Price({ trip, size = "md", tone = "light" }: { trip: Trip; size?: "md" | "lg"; tone?: "light" | "dark" }) {
  const { lang, t } = useLang();
  const adultPrices = trip.priceOptions?.filter((p) => p.kind === "adult") ?? [];
  const amount = adultPrices.length ? Math.min(...adultPrices.map((p) => p.amount)) : undefined;
  const onRequest = amount === undefined && !trip.pricingSchedule?.length;
  const label = onRequest ? t.detail.price : amount === undefined ? t.detail.prices : adultPrices.length === 1 ? t.trips.pricePerPerson : t.trips.startingFrom;
  return (
    <div>
      <p className={cn("text-[11px] font-medium tracking-[0.14em] uppercase", tone === "dark" ? "text-white/55" : "text-muted")}>{label}</p>
      {amount === undefined || !trip.currency ? (
        <p className={cn("mt-1 font-semibold tracking-tight", tone === "dark" ? "text-white" : "text-navy-900", size === "lg" ? "text-2xl" : "text-lg")}>
          {onRequest ? t.trips.priceOnRequest : t.trips.pricesVary}
        </p>
      ) : (
        <p className={cn("mt-1 flex items-baseline gap-1.5 font-semibold tracking-tight", tone === "dark" ? "text-white" : "text-navy-900")}>
          <span className={cn("tabular-nums", size === "lg" ? "text-4xl" : "text-2xl")}>{formatNumber(amount, lang)}</span>
          <span className={cn("font-semibold text-sun-deep", size === "lg" ? "text-base" : "text-sm")}>{formatCurrencyLabel(trip.currency, lang)}</span>
        </p>
      )}
    </div>
  );
}

/** "Summer 2026" season badge, or the date of the Facebook post the offer came from. */
export function OfferStamp({ trip, className }: { trip: Trip; className?: string }) {
  const { t, l, lang } = useLang();
  if (!trip.season && !trip.postedOn) return null;
  return (
    <span className={cn("inline-flex items-center gap-1.5 rounded-full bg-sun px-3 py-1 text-[11px] font-semibold text-navy-950", className)}>
      {trip.season ? l(trip.season) : `${t.trips.posted} ${formatDate(trip.postedOn!, lang, { month: "short", year: "numeric" })}`}
    </span>
  );
}

/** Duration text from supplied data only; null when no duration was supplied. */
export function durationLabel(trip: Trip, lang: Lang): string | null {
  if (trip.durationDays && trip.durationNights) return `${countLabel(trip.durationDays, "day", lang)} / ${countLabel(trip.durationNights, "night", lang)}`;
  if (trip.durationDays) return countLabel(trip.durationDays, "day", lang);
  if (trip.durationNights) return countLabel(trip.durationNights, "night", lang);
  const nights = [...new Set(trip.pricingSchedule?.map((r) => r.nights) ?? [])].sort();
  if (nights.length === 1) return countLabel(nights[0], "night", lang);
  if (nights.length > 1) return lang === "ar" ? `${nights.join(" أو ")} ليالٍ` : `${nights.join(" or ")} Nights`;
  return null;
}

/** Up to two short facts for trip cards, from supplied data only. */
export function cardFacts(trip: Trip, t: Dictionary, lang: Lang, l: (v: Localized) => string) {
  const dates = tripDepartures(trip);
  const facts: { label: string; value: string }[] = [];
  if (dates.length) {
    facts.push({ label: t.trips.departure, value: formatMonthDay(dates[0], lang) });
    facts.push({ label: t.trips.departures, value: t.trips.datesCount(dates.length) });
  } else if (trip.period) {
    // Long free-text periods get the full card width
    facts.push({ label: t.trips.period, value: l(trip.period) });
  } else if (trip.program) {
    facts.push({ label: t.trips.program, value: l(trip.program) });
  } else if (trip.postedOn) {
    facts.push({ label: t.detail.postedOn, value: formatDate(trip.postedOn, lang, { day: "numeric", month: "long", year: "numeric" }) });
  }
  return facts.slice(0, 2);
}
