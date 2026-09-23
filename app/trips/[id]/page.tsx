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
  if (!trip) return { title: "Trip not found" };
  return {
    title: `${trip.title.en} — ${trip.destination.en}`,
    description: trip.shortDescription.en,
    openGraph: { images: [trip.heroImage] },
  };
}

export default async function TripPage({ params }: PageProps<"/trips/[id]">) {
  const { id } = await params;
  const trip = getTrip(id);
  if (!trip) notFound();

  // Related: shares a category, earliest listed departure first
  const first = (t: typeof trip) => tripDepartures(t)[0] ?? "99";
  const related = trips
    .filter((t) => t.id !== trip.id && t.categories.some((c) => trip.categories.includes(c)))
    .sort((a, b) => first(a).localeCompare(first(b)))
    .slice(0, 3);

  return <TripDetail trip={trip} related={related} />;
}
