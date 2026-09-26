import type { GalleryItem, Localized } from "@/lib/types";
import { images } from "./images";

/**
 * GALLERY — photos and video frames from LAVIE TOURS' own Facebook posts.
 */
const cat = {
  pools: { en: "Pools & aqua parks", ar: "حمامات سباحة وأكوا بارك" },
  hotels: { en: "Hotels", ar: "الفنادق" },
  beaches: { en: "Beaches", ar: "الشواطئ" },
} satisfies Record<string, Localized>;

export const gallery: GalleryItem[] = [
  { src: images.tulipAquaPark, alt: { en: "Aqua park at Tolip Galala Heights, Ain Sokhna", ar: "الأكوا بارك في توليب الجلالة هايتس، العين السخنة" }, category: cat.pools, shape: "tall" },
  { src: images.gewanResort, alt: { en: "Gewan resort pools facing the sea, New Alamein", ar: "حمامات سباحة جيوان قدام البحر، العلمين الجديدة" }, category: cat.hotels, shape: "wide" },
  { src: images.dayzBeachSunset, alt: { en: "Sunset on the beach, Dayz Inn Alamein", ar: "الغروب على الشاطئ، Dayz Inn العلمين" }, category: cat.beaches, shape: "tall" },
  { src: images.dayzCourtyardNight, alt: { en: "Dayz Inn Alamein courtyard and pool at dusk", ar: "ساحة وحمام سباحة Dayz Inn العلمين بالليل" }, category: cat.hotels, shape: "wide" },
  { src: images.gewanPool, alt: { en: "Gewan pool on the North Coast", ar: "حمام سباحة جيوان في الساحل الشمالي" }, category: cat.pools, shape: "tall" },
  { src: images.dayzUmbrellas, alt: { en: "Beach umbrellas in front of the Alamein Towers", ar: "شماسي الشاطئ قدام أبراج العلمين" }, category: cat.beaches, shape: "square" },
  { src: images.dayzSeafront, alt: { en: "The sea at New Alamein", ar: "البحر في العلمين الجديدة" }, category: cat.beaches, shape: "square" },
];
