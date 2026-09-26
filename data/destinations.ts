import type { Destination } from "@/lib/types";
import { images } from "./images";

/**
 * DESTINATIONS — only places LAVIE TOURS advertises in its Facebook offers.
 * `id` is used by trips (trip.destinationId) and by the trip filters.
 */
export const destinations: Destination[] = [
  {
    id: "new-alamein",
    name: { en: "New Alamein", ar: "العلمين الجديدة" },
    country: { en: "North Coast · Egypt", ar: "الساحل الشمالي · مصر" },
    tagline: { en: "Gewan Resort, Gewan White Beach & Dayz Inn", ar: "جيوان ريزورت وجيوان وايت بيتش و Dayz Inn" },
    image: images.gewanResort,
    scope: "domestic",
  },
  {
    id: "ain-sokhna",
    name: { en: "Ain Sokhna", ar: "العين السخنة" },
    country: { en: "Red Sea · Egypt", ar: "البحر الأحمر · مصر" },
    tagline: { en: "Tolip Galala Heights — aqua park", ar: "توليب الجلالة هايتس — أكوا بارك" },
    image: images.tulipAquaPark,
    imagePosition: "50% 68%",
    scope: "domestic",
  },
];

export function getDestination(id: string) {
  return destinations.find((d) => d.id === id);
}
