import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getTrip, trips, tripDepartures } from "@/data/trips";
import { TripDetail } from "@/components/trips/TripDetail";

export function generateStaticParams() {
  return trips.map((trip) => ({ id: trip.id }));
}

export async function generateMetadata({ params }: PageProps<"/trips/[id]">): Promise<Metadata> {
  const { id } = await params;
  const trip = getTrip(id);
  if (!trip) return { title: "العرض غير موجود" };
  return {
    title: `${trip.title.ar} — ${trip.destination.ar}`,
    description: trip.shortDescription.ar,
    openGraph: { images: [trip.heroImage] },
  };
}

export default async function TripPage({ params }: PageProps<"/trips/[id]">) {
  const { id } = await params;
  const trip = getTrip(id);
  if (!trip) notFound();

  // Related: shares a category — same destination first, then earliest listed departure
  const first = (t: typeof trip) => tripDepartures(t)[0] ?? "99";
  const sameDestination = (t: typeof trip) => (t.destinationId === trip.destinationId ? 0 : 1);
  const related = trips
    .filter((t) => t.id !== trip.id && t.categories.some((c) => trip.categories.includes(c)))
    .sort((a, b) => sameDestination(a) - sameDestination(b) || first(a).localeCompare(first(b)))
    .slice(0, 3);

  return <TripDetail trip={trip} related={related} />;
}
