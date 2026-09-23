import type { Destination } from "@/lib/types";
import { images } from "./images";

/**
 * DESTINATIONS — only destinations of Jeddah Tourism's verified offers.
 * `id` is used by trips (trip.destinationId) and by the trip filters.
 */
export const destinations: Destination[] = [
  {
    id: "makkah-madinah",
    name: { en: "Makkah & Madinah", ar: "مكة المكرمة والمدينة المنورة" },
    country: { en: "Saudi Arabia", ar: "السعودية" },
    tagline: { en: "Hajj & Umrah programs", ar: "برامج الحج والعمرة" },
    image: images.madinahGreenDomePortrait,
    scope: "international",
  },
  {
    id: "marsa-matrouh",
    name: { en: "Marsa Matrouh", ar: "مرسى مطروح" },
    country: { en: "Egypt", ar: "مصر" },
    tagline: { en: "Summer coastal trips", ar: "رحلات صيفية" },
    image: images.matrouhAgibaCove,
    scope: "domestic",
  },
];

export function getDestination(id: string) {
  return destinations.find((d) => d.id === id);
}
