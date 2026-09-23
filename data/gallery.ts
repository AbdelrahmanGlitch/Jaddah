import type { GalleryItem, Localized } from "@/lib/types";
import { images } from "./images";

/**
 * GALLERY — real photographs of Makkah, Madinah and Marsa Matrouh
 * (Wikimedia Commons — see public/images/jeddah-tourism/CREDITS.md).
 * They are not photos taken by Jeddah Tourism; replace `src` with the
 * company's own trip photos whenever available.
 */
const cat = {
  beaches: { en: "Beaches", ar: "الشواطئ" },
  hotels: { en: "Hotels", ar: "الفنادق" },
  holySites: { en: "Holy sites", ar: "الأماكن المقدسة" },
  travelers: { en: "Travelers", ar: "المسافرون" },
} satisfies Record<string, Localized>;

export const gallery: GalleryItem[] = [
  { src: images.matrouhAgibaTall, alt: { en: "Clear water at Agiba Beach, Marsa Matrouh", ar: "مياه صافية في شاطئ عجيبة، مرسى مطروح" }, category: cat.beaches, shape: "tall" },
  { src: images.hajjKaabaEvening, alt: { en: "The Kaaba and the mataf in the evening", ar: "الكعبة المشرفة وصحن الطواف مساءً" }, category: cat.holySites, shape: "wide" },
  { src: images.delmarRoom, alt: { en: "Sea-view room at Delmar Hotel, Marsa Matrouh", ar: "غرفة بإطلالة بحرية في فندق دليمار، مرسى مطروح" }, category: cat.hotels, shape: "square" },
  { src: images.matrouhCleopatraBath2, alt: { en: "Cleopatra's Bath, Cleopatra Beach, Marsa Matrouh", ar: "حمام كليوباترا، شاطئ كليوباترا، مرسى مطروح" }, category: cat.beaches, shape: "wide" },
  { src: images.madinahGreenDome, alt: { en: "The Green Dome of Al-Masjid an-Nabawi, Madinah", ar: "القبة الخضراء بالمسجد النبوي، المدينة المنورة" }, category: cat.holySites, shape: "tall" },
  { src: images.matrouhCityBeach, alt: { en: "City beach in Marsa Matrouh", ar: "شاطئ المدينة في مرسى مطروح" }, category: cat.beaches, shape: "square" },
  { src: images.hajjKaabaPilgrimsNight, alt: { en: "Pilgrims in the Haram courtyard at night", ar: "معتمرون في صحن الحرم ليلًا" }, category: cat.travelers, shape: "square" },
  { src: images.matrouhCityBay, alt: { en: "Marsa Matrouh bay and city", ar: "خليج ومدينة مرسى مطروح" }, category: cat.beaches, shape: "wide" },
  { src: images.umrahKaabaCourtyard, alt: { en: "Pilgrims at the mataf during prayer, Masjid al-Haram", ar: "المصلون في صحن الطواف بالمسجد الحرام" }, category: cat.travelers, shape: "tall" },
  { src: images.delmarFacade, alt: { en: "Delmar Hotel, Marsa Matrouh corniche", ar: "فندق دليمار على كورنيش مرسى مطروح" }, category: cat.hotels, shape: "square" },
  { src: images.madinahEvening, alt: { en: "Al-Masjid an-Nabawi courtyard in the evening", ar: "ساحة المسجد النبوي مساءً" }, category: cat.holySites, shape: "tall" },
  { src: images.matrouhAgibaCliffs, alt: { en: "Cliffs and turquoise water at Agiba Beach", ar: "منحدرات ومياه فيروزية في شاطئ عجيبة" }, category: cat.beaches, shape: "wide" },
];
