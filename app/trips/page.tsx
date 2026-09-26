import type { Metadata } from "next";
import { ListingHero } from "@/components/trips/ListingHero";
import { TripExplorer } from "@/components/trips/TripExplorer";
import { CATEGORY_ORDER, type TripFilters } from "@/lib/trip-filters";
import type { TripCategory } from "@/lib/types";

export const metadata: Metadata = {
  title: "العروض",
  description: "عروض فنادق ومنتجعات LAVIE TOURS في العلمين الجديدة والعين السخنة — للحجز والاستعلام اتصال أو واتساب.",
};

const pick = <T extends string>(value: string | string[] | undefined, allowed?: readonly T[]): T | undefined => {
  const v = Array.isArray(value) ? value[0] : value;
  if (!v) return undefined;
  if (allowed && !allowed.includes(v as T)) return undefined;
  return v as T;
};

export default async function TripsPage({ searchParams }: PageProps<"/trips">) {
  const sp = await searchParams;
  const initial: Partial<TripFilters> = {
    destination: pick(sp.destination) ?? "",
    type: pick<TripCategory>(sp.type, CATEGORY_ORDER) ?? "",
    duration: pick(sp.duration, ["short", "medium", "long"] as const) ?? "",
    price: pick(sp.price, ["budget", "mid", "premium"] as const) ?? "",
    month: pick(sp.month) ?? "",
    sort: pick(sp.sort, ["soonest", "priceLow", "priceHigh"] as const) ?? "soonest",
  };

  return (
    <div className="bg-mist">
      <ListingHero />
      <TripExplorer key={JSON.stringify(initial)} initial={initial} />
    </div>
  );
}
