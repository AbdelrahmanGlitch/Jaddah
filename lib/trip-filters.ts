import { lowestAdultPrice, trips as allTrips, tripDepartures } from "@/data/trips";
import type { Trip, TripCategory } from "./types";

export const CATEGORY_ORDER: TripCategory[] = ["religious", "summer", "beach", "family", "adventure", "honeymoon", "cultural", "international", "domestic"];

/** Only categories that at least one trip actually uses — so filters never show empty types. */
export function availableCategories(list: Trip[] = allTrips): TripCategory[] {
  const used = new Set(list.flatMap((t) => t.categories));
  return CATEGORY_ORDER.filter((c) => used.has(c));
}

export type DurationBucket = "short" | "medium" | "long";
export type PriceBucket = "budget" | "mid" | "premium";
export type SortKey = "soonest" | "priceLow" | "priceHigh";

export type TripFilters = {
  destination: string;
  type: TripCategory | "";
  duration: DurationBucket | "";
  price: PriceBucket | "";
  month: string;
  sort: SortKey;
};

export const emptyFilters: TripFilters = { destination: "", type: "", duration: "", price: "", month: "", sort: "soonest" };

// Trips without the relevant data (e.g. no stated duration) are excluded when that filter is active.
const inDuration = (t: Trip, d: DurationBucket) => {
  const days = t.durationDays;
  if (days === undefined) return false;
  return d === "short" ? days <= 4 : d === "medium" ? days >= 5 && days <= 6 : days >= 7;
};
const inPrice = (t: Trip, p: PriceBucket) => {
  const price = lowestAdultPrice(t);
  if (price === undefined) return false;
  return p === "budget" ? price < 15000 : p === "mid" ? price >= 15000 && price < 50000 : price >= 50000;
};

/** Month keys ("07") that have at least one departure. */
export function departureMonths(list: Trip[] = allTrips): string[] {
  return [...new Set(list.flatMap((t) => tripDepartures(t).map((d) => d.slice(0, 2))))].sort();
}

export function applyFilters(list: Trip[], f: TripFilters): Trip[] {
  const result = list.filter(
    (t) =>
      (!f.destination || t.destinationId === f.destination) &&
      (!f.type || t.categories.includes(f.type)) &&
      (!f.duration || inDuration(t, f.duration)) &&
      (!f.price || inPrice(t, f.price)) &&
      (!f.month || tripDepartures(t).some((d) => d.startsWith(`${f.month}-`))),
  );
  const first = (t: Trip) => tripDepartures(t)[0] ?? "99";
  const price = (t: Trip) => lowestAdultPrice(t) ?? Number.MAX_SAFE_INTEGER;
  return result.sort((a, b) => (f.sort === "priceLow" ? price(a) - price(b) : f.sort === "priceHigh" ? price(b) - price(a) : first(a).localeCompare(first(b))));
}

export function activeFilterCount(f: TripFilters) {
  return [f.destination, f.type, f.duration, f.price, f.month].filter(Boolean).length;
}
