import type { Trip } from "@/lib/types";
import { images } from "./images";

/**
 * OFFERS — taken from LAVIE TOURS' Facebook posts
 * ==================================================================
 * Every hotel name, feature and board basis below is written in the post
 * it came from (see `postedOn`). The posts give no prices, durations or
 * departure dates, so none are shown — the site says "price on request".
 * Do not add details that are not in a Lavie post.
 *
 * HOW TO ADD AN OFFER
 *   1. Copy one object below and change `id` (used in the URL /trips/{id}).
 *   2. Set `destinationId` to an id from data/destinations.ts.
 *   3. Set `postedOn` to the date of the Facebook post.
 *   4. Fixed prices go in `priceOptions`; date-based prices in `pricingSchedule`
 *      (set `currency` too). Leave them out when the post has no price.
 *   5. Leave fields out (or arrays empty) when the information is unknown —
 *      the website hides empty sections automatically.
 *   6. Set `featured: true` to show the offer on the homepage.
 * ==================================================================
 */

const egypt = { en: "Egypt", ar: "مصر" };
const newAlamein = { en: "New Alamein", ar: "العلمين الجديدة" };
const summer2026 = { en: "Summer 2026", ar: "صيف 2026" };
const confirmOnBooking = {
  en: "Prices and availability are confirmed when you book — call or WhatsApp.",
  ar: "الأسعار والأماكن المتاحة بتتأكد وقت الحجز — اتصال أو واتساب.",
};

export const trips: Trip[] = [
  // ---------------------------------------------------------------- 1. DAYZ INN — post of 15 Jul 2026
  {
    id: "dayz-inn-alamein",
    title: { en: "Dayz Inn Alamein", ar: "Dayz Inn Alamein" },
    destination: newAlamein,
    destinationId: "new-alamein",
    country: egypt,
    categories: ["hotel", "summer", "beach"],
    season: summer2026,
    postedOn: "2026-07-15",
    shortDescription: {
      en: "A different summer in the heart of New Alamein — a prime spot in front of the Alamein Towers, and every room has a sea view.",
      ar: "صيف مختلف في قلب العلمين الجديدة — موقع مميز أمام أبراج العلمين، وكل الغرف سي فيو.",
    },
    description: {
      en: "Exclusive summer 2026 in El Alamein — your room at the beach. If you're looking for a different summer in the heart of New Alamein, Dayz Inn Alamein has a prime location in front of the Alamein Towers, sea-view rooms throughout and free Wi-Fi in every room.",
      ar: "صيف 2026 حصري في العلمين — أوضتك على البحر. لو بتدور على صيف مختلف في قلب العلمين الجديدة… يبقى Dayz Inn Alamein: موقع مميز أمام أبراج العلمين، كل الغرف سي فيو، وواي فاي مجاني في كل الغرف.",
    },
    heroImage: images.dayzBeachSunset,
    gallery: [images.dayzBeachSunset, images.dayzCourtyardNight, images.dayzSeafront, images.dayzUmbrellas],
    featured: true,
    services: ["hotel"],
    included: [{ en: "Free Wi-Fi in every room", ar: "واي فاي مجاني في كل الغرف" }],
    excluded: [],
    itinerary: [],
    highlights: [
      { en: "Prime location in front of the Alamein Towers", ar: "موقع مميز أمام أبراج العلمين" },
      { en: "All rooms are sea view", ar: "كل الغرف سي فيو" },
      { en: "Your room at the beach", ar: "أوضتك على البحر (Your room at the beach)" },
    ],
    importantInfo: [
      { en: "Summer 2026 offer, posted on 15 July 2026.", ar: "عرض صيف 2026، منشور يوم 15 يوليو 2026." },
      confirmOnBooking,
    ],
    faq: [],
  },

  // ---------------------------------------------------------------- 2. TOLIP GALALA HEIGHTS — post of 8 Jun 2026
  {
    id: "tolip-galala-heights-sokhna",
    title: { en: "Tolip Galala Heights (Aqua Park)", ar: "توليب الجلالة هايتس (أكوا بارك)" },
    destination: { en: "Ain Sokhna", ar: "العين السخنة" },
    destinationId: "ain-sokhna",
    country: egypt,
    categories: ["hotel", "beach"],
    postedOn: "2026-06-08",
    shortDescription: {
      en: "One of the newest hotels in Ain Sokhna (opened 2024) — every room has a pool view, with half-board stays.",
      ar: "من أحدث فنادق العين السخنة (افتتاح 2024) — جميع الغرف بوول فيو، والإقامة هاف بورد.",
    },
    description: {
      en: "Enjoy your stay at Tolip Galala Heights, one of the newest hotels in Sokhna (opened 2024). All rooms overlook the pool, with a sandy beach, swimming pools plus a heated pool, free Wi-Fi and a coffee tray in the rooms. Stays are half board (breakfast and dinner), and full board is available at an extra charge.",
      ar: "استمتع بإقامتك في فندق توليب هايتس الجلالة، من أجدد فنادق السخنة (افتتاح 2024). جميع الغرف مطلة على البول، شاطئ رملي، حمامات سباحة + حمام سباحة دافي، واي فاي مجانًا، وكوفي تريه داخل الغرف. الإقامة هاف بورد (فطار وعشاء)، وكمان متاح إقامة كاملة Full Board اكسترا تشارج.",
    },
    heroImage: images.tulipAquaPark,
    gallery: [images.tulipAquaPark],
    featured: true,
    services: ["hotel", "meals"],
    included: [
      { en: "Half board — breakfast & dinner", ar: "الإقامة هاف بورد — فطار وعشاء" },
      { en: "Free Wi-Fi", ar: "واي فاي مجانًا" },
      { en: "Coffee tray in the rooms", ar: "كوفي تريه داخل الغرف" },
    ],
    excluded: [],
    itinerary: [],
    highlights: [
      { en: "Aqua park", ar: "أكوا بارك" },
      { en: "All rooms are pool view", ar: "جميع الغرف بوول فيو" },
      { en: "One of the newest hotels in Ain Sokhna — opened 2024", ar: "من أحدث فنادق العين السخنة — افتتاح 2024" },
      { en: "Sandy beach", ar: "شاطئ رملي" },
      { en: "Swimming pools + a heated pool", ar: "حمامات سباحة + حمام سباحة دافي" },
    ],
    importantInfo: [
      { en: "Full board (breakfast, lunch & dinner) is available at an extra charge.", ar: "متاح إقامة كاملة Full Board (فطار – غداء – عشاء) بتكلفة إضافية." },
      confirmOnBooking,
    ],
    faq: [],
  },

  // ---------------------------------------------------------------- 3. GEWAN — post of 17 May 2026, shared again 8 Jun 2026
  {
    id: "gewan-new-alamein",
    title: { en: "Gewan Resort Aqua Park & Gewan White Beach", ar: "جيوان ريزورت أكوا بارك & جيوان وايت بيتش" },
    destination: newAlamein,
    destinationId: "new-alamein",
    country: egypt,
    categories: ["hotel", "summer", "beach"],
    postedOn: "2026-06-08",
    shortDescription: {
      en: "Choose between two 5-star ultra-deluxe hotels, first row on the sea in New Alamein — a big aqua park and half-board open buffet.",
      ar: "اختار بين فندقين 5 نجوم ألترا ديلوكس صف أول على البحر في العلمين الجديدة — أكوا بارك كبير وإقامة هاف بورد أوبن بوفيه.",
    },
    description: {
      en: "Looking for a different summer in New Alamein? Choose between two hotels that combine luxury, comfort and the best sea view, in one of Egypt's newest coastal cities: Gewan Resort Aqua Park and Gewan White Beach.",
      ar: "لو بتدور على تجربة صيف مختلفة في العلمين الجديدة، اختار بين فندقين بيجمعوا بين الفخامة والراحة وأجمل فيو على البحر، في قلب واحدة من أحدث المدن الساحلية في مصر: جيوان ريزورت أكوا بارك وجيوان وايت بيتش.",
    },
    heroImage: images.gewanResort,
    gallery: [images.gewanResort, images.gewanPool],
    featured: true,
    services: ["hotel", "meals"],
    included: [
      { en: "Half board — breakfast & dinner, open buffet", ar: "الإقامة هاف بورد — فطار وعشاء أوبن بوفيه" },
      { en: "Free Wi-Fi", ar: "واي فاي مجانًا" },
      { en: "Swimming pools + a heated pool", ar: "حمامات سباحة + حمام سباحة دافي" },
    ],
    excluded: [],
    itinerary: [],
    highlights: [
      { en: "5-star ultra deluxe", ar: "مستوى 5 نجوم ألترا ديلوكس" },
      { en: "First row on the sea", ar: "صف أول على البحر" },
      { en: "A big aqua park", ar: "مدينة أكوا بارك كبيرة" },
      { en: "Excellent sandy beach", ar: "شاطئ رملي ممتاز" },
      { en: "Emirati management", ar: "إدارة إماراتية" },
      { en: "Brand new — opened 2022", ar: "الفندق جديد كليًا — افتتاح 2022" },
      { en: "Rooms from 42 m²", ar: "مساحة الغرف تبدأ من 42 م²" },
    ],
    importantInfo: [confirmOnBooking],
    faq: [],
  },
];

export function getTrip(id: string) {
  return trips.find((t) => t.id === id);
}

export const featuredTrips = trips.filter((t) => t.featured);

// ---------- Derived helpers (read-only views of the data above) ----------

/** All departure dates ("MM-DD"), sorted — from `departures` or the pricing schedule. */
export function tripDepartures(trip: Trip): string[] {
  const dates = trip.departures ?? trip.pricingSchedule?.flatMap((r) => r.dates) ?? [];
  return [...dates].sort();
}

/** Lowest adult price — used for sorting/filtering only. */
export function lowestAdultPrice(trip: Trip): number | undefined {
  const prices = [
    ...(trip.priceOptions?.filter((p) => p.kind === "adult").map((p) => p.amount) ?? []),
    ...(trip.pricingSchedule?.map((r) => r.adult) ?? []),
  ];
  return prices.length ? Math.min(...prices) : undefined;
}

/** True when the post gave any price at all. */
export const hasPrice = (trip: Trip) => Boolean(trip.priceOptions?.length || trip.pricingSchedule?.length);
