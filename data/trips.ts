import type { Localized, Trip } from "@/lib/types";
import { images } from "./images";

/**
 * TRIPS — VERIFIED COMPANY OFFERS
 * ==================================================================
 * Prices, dates, hotels and inclusions below were supplied by
 * Jeddah Tourism. Do not add details that were not provided.
 * Photos are still placeholders (see data/images.ts).
 *
 * HOW TO ADD A TRIP
 *   1. Copy one object below and change `id` (used in the URL /trips/{id}).
 *   2. Set `destinationId` to an id from data/destinations.ts.
 *   3. Departure dates use "MM-DD" (no year unless supplied).
 *   4. Fixed prices go in `priceOptions`; date-based prices in `pricingSchedule`.
 *   5. Leave fields out (or arrays empty) when the information is unknown —
 *      the website hides empty sections automatically.
 *   6. Set `featured: true` to show the trip on the homepage.
 * ==================================================================
 */

const perPerson: Localized = { en: "per person", ar: "للفرد" };

const matrouhBeaches: Localized = {
  en: "Beaches: Al-Gharram, Cleopatra, Rommel, Al-Obayed, Al-Hana, Al-Fayrouz",
  ar: "الشواطئ: الغرام، كليوباترا، روميل، الأبيض، الهنا، الفيروز",
};

const underSixFree: Localized = {
  en: "Children under 6 years old are free.",
  ar: "الأطفال أقل من 6 سنوات مجانًا.",
};

const extraBusSeat: Localized = {
  en: "Extra bus seat: 800 EGP — includes an internal bus seat, an external bus seat and a beach chair.",
  ar: "كرسي أتوبيس إضافي: 800 جنيه — يشمل كرسي الأتوبيس الداخلي والخارجي وكرسي على الشاطئ.",
};

const seaViewDirect: Localized = { en: "Direct sea view", ar: "مباشر على البحر" };
const seaViewSide: Localized = { en: "Side / open sea view", ar: "جانب مفتوح على البحر" };
const child: Localized = { en: "Child", ar: "الطفل" };

const summer2026: Localized = { en: "Summer 2026", ar: "صيف 2026" };

export const trips: Trip[] = [
  // ---------------------------------------------------------------- 1. HAJJ
  {
    id: "hajj-1447",
    title: { en: "Hajj Flights 1447 AH", ar: "الحج طيران 1447 هـ" },
    destination: { en: "Makkah", ar: "مكة المكرمة" },
    destinationId: "makkah-madinah",
    country: { en: "Saudi Arabia", ar: "السعودية" },
    categories: ["religious"],
    program: { en: "Tahseen", ar: "تحسين" },
    period: { en: "From 2 Dhu al-Hijjah to 19 Dhu al-Hijjah", ar: "من 2 ذو الحجة إلى 19 ذو الحجة" },
    shortDescription: {
      en: "Tahseen Hajj program at the 5-star Anjam Hotel, located on the Haram courtyard.",
      ar: "برنامج حج تحسين في فندق انجم 5 نجوم على ساحة الحرم.",
    },
    description: {
      en: "Hajj 1447 AH — Tahseen program, from 2 Dhu al-Hijjah to 19 Dhu al-Hijjah, with accommodation at the 5-star Anjam Hotel, located on the Haram courtyard. The price does not include the flight ticket.",
      ar: "حج 1447 هـ — برنامج تحسين، من 2 ذو الحجة إلى 19 ذو الحجة، مع الإقامة في فندق انجم 5 نجوم على ساحة الحرم. السعر غير شامل تذكرة الطيران.",
    },
    heroImage: images.hajjHero,
    gallery: [images.hajjHero, images.hajjKaabaNight, images.hajjMakkahAerial, images.hajjPilgrims, images.hajjHaramAerialNight],
    durationDays: 7,
    currency: "EGP",
    priceOptions: [{ label: { en: "Per person", ar: "للفرد" }, amount: 267000, kind: "adult" }],
    priceNote: perPerson,
    featured: true,
    services: ["hotel"],
    included: [],
    excluded: [{ en: "Flight ticket", ar: "تذكرة الطيران" }],
    itinerary: [],
    highlights: [
      { en: "Tahseen program", ar: "برنامج تحسين" },
      { en: "Anjam Hotel — 5 stars", ar: "فندق انجم — 5 نجوم" },
      { en: "Located on the Haram courtyard", ar: "على ساحة الحرم" },
    ],
    importantInfo: [{ en: "Flight ticket is NOT included in the price.", ar: "السعر غير شامل تذكرة الطيران." }],
    faq: [],
  },

  // ---------------------------------------------------------------- 2. UMRAH
  {
    id: "umrah-programs",
    title: { en: "Umrah Programs", ar: "برامج العمرة" },
    destination: { en: "Makkah & Madinah", ar: "مكة المكرمة والمدينة المنورة" },
    destinationId: "makkah-madinah",
    country: { en: "Saudi Arabia", ar: "السعودية" },
    categories: ["religious"],
    shortDescription: {
      en: "15-day Umrah program: 7 days at Infiniti Hotel in Makkah and 7 days at Sama Al Thahabi Hotel in Madinah.",
      ar: "برنامج عمرة 15 يومًا: 7 أيام في فندق انفينيتي بمكة و7 أيام في فندق سما الذهبي بالمدينة.",
    },
    description: {
      en: "A 15-day Umrah program with 7 days at Infiniti Hotel in Makkah and 7 days at Sama Al Thahabi Hotel in Madinah — with premium hotels close to the Haram, modern and comfortable transportation, religious visits, religious supervision throughout the trip and 24/7 customer service.",
      ar: "برنامج عمرة لمدة 15 يومًا: 7 أيام في فندق انفينيتي بمكة المكرمة و7 أيام في فندق سما الذهبي بالمدينة المنورة، مع فنادق مميزة بالقرب من الحرم ووسائل انتقال حديثة ومريحة وزيارات دينية وإشراف ديني طوال الرحلة وخدمة عملاء على مدار الساعة.",
    },
    heroImage: images.umrahHero,
    gallery: [images.umrahHero, images.umrahKaaba, images.umrahNabawiUmbrellas, images.umrahKaabaCourtyard, images.umrahMadinahNight],
    durationDays: 15,
    departures: ["09-09", "09-16", "09-23", "09-30"],
    currency: "EGP",
    priceOptions: [{ label: { en: "Per person", ar: "للفرد" }, amount: 48500, kind: "adult" }],
    priceNote: perPerson,
    featured: true,
    services: ["hotel", "transfers", "tours"],
    included: [
      { en: "Premium hotels close to Haram", ar: "فنادق مميزة بالقرب من الحرم" },
      { en: "Modern, comfortable transportation", ar: "وسائل انتقال حديثة ومريحة" },
      { en: "Religious tours and visits (Ziyarat)", ar: "زيارات دينية" },
      { en: "Religious supervision throughout the trip", ar: "إشراف ديني طوال الرحلة" },
      { en: "24/7 customer service support", ar: "خدمة عملاء على مدار الساعة" },
    ],
    excluded: [],
    itinerary: [],
    highlights: [
      { en: "Makkah: Infiniti Hotel — 7 days", ar: "مكة المكرمة: فندق انفينيتي — 7 أيام" },
      { en: "Madinah: Sama Al Thahabi Hotel — 7 days", ar: "المدينة المنورة: فندق سما الذهبي — 7 أيام" },
    ],
    importantInfo: [],
    faq: [],
  },

  // ---------------------------------------------------------------- 3. RIO HOTEL
  {
    id: "rio-hotel-marsa-matrouh",
    title: { en: "Rio Hotel — Marsa Matrouh", ar: "فندق ريو - مرسى مطروح" },
    destination: { en: "Marsa Matrouh", ar: "مرسى مطروح" },
    destinationId: "marsa-matrouh",
    country: { en: "Egypt", ar: "مصر" },
    categories: ["summer"],
    season: summer2026,
    shortDescription: {
      en: "5 days / 4 nights with daily open-buffet breakfast and dinner, round-trip bus from Alexandria and six beaches.",
      ar: "5 أيام / 4 ليالٍ مع إفطار وعشاء يوميًا بوفيه مفتوح، وأتوبيس ذهاب وعودة من الإسكندرية، و6 شواطئ.",
    },
    description: {
      en: "Summer 2026 at Rio Hotel, at the end of Alexandria Street in front of the Matrouh Governorate Building. The program includes daily breakfast and dinner (open buffet), in-room drinks, round-trip bus transportation from Alexandria to Marsa Matrouh, and internal and external transportation to six beaches.",
      ar: "صيف 2026 في فندق ريو، نهاية شارع الإسكندرية أمام مبنى محافظة مطروح. يشمل البرنامج إفطارًا وعشاءً يوميًا بوفيه مفتوح، ومشروبات بالغرفة، وانتقالات بالأتوبيس ذهابًا وعودة من الإسكندرية إلى مرسى مطروح، وانتقالات داخلية وخارجية إلى 6 شواطئ.",
    },
    heroImage: images.matrouhCleopatraBath,
    gallery: [images.matrouhCleopatraBath, images.matrouhBeachChairs, images.buffetBreakfast, images.buffetHotDishes, images.matrouhCleopatraFamilies],
    durationDays: 5,
    durationNights: 4,
    departures: [
      "07-08", "07-12", "07-16", "07-20", "07-24", "07-28",
      "08-01", "08-05", "08-09", "08-13", "08-17", "08-21", "08-25", "08-29",
      "09-02", "09-06",
    ],
    departureCity: { en: "Alexandria", ar: "الإسكندرية" },
    currency: "EGP",
    priceOptions: [
      { label: seaViewDirect, amount: 7500, kind: "adult", note: perPerson },
      { label: seaViewSide, amount: 7000, kind: "adult", note: perPerson },
      { label: child, amount: 5700, kind: "child" },
    ],
    priceNote: perPerson,
    featured: true,
    services: ["hotel", "meals", "transfers"],
    included: [
      { en: "Daily breakfast and dinner — open buffet", ar: "إفطار وعشاء يوميًا — بوفيه مفتوح" },
      { en: "In-room drinks: Nescafe, tea, sugar", ar: "مشروبات بالغرفة: نسكافيه، شاي، سكر" },
      {
        en: "Breakfast: fresh pastries, tea, coffee, Nescafe, milk, cheeses, cold cuts, beans, falafel, boiled eggs, potato puree, eggplant, vegetables, pickles, omelet",
        ar: "الإفطار: معجنات طازجة، شاي، قهوة، نسكافيه، لبن، أجبان، لحوم باردة، فول، فلافل، بيض مسلوق، بطاطس بيوريه، باذنجان، خضروات، مخللات، أومليت",
      },
      {
        en: "Dinner: daily rotating protein — beef, chicken and a third option such as quail, duck or pigeon",
        ar: "العشاء: بروتين متغير يوميًا — لحم، دجاج، وصنف ثالث مثل السمان أو البط أو الحمام",
      },
      { en: "Dinner also includes a special fish/barbecue day, pasta, cooked vegetables and salads", ar: "يشمل العشاء أيضًا يومًا خاصًا للسمك/المشويات، ومكرونة، وخضار مطبوخ، وسلطات" },
      { en: "Round-trip bus transportation from Alexandria to Marsa Matrouh", ar: "انتقالات بالأتوبيس ذهابًا وعودة من الإسكندرية إلى مرسى مطروح" },
      { en: "Internal and external beach transportation", ar: "انتقالات داخلية وخارجية إلى الشواطئ" },
      matrouhBeaches,
    ],
    excluded: [],
    itinerary: [],
    highlights: [
      { en: "End of Alexandria Street, in front of Matrouh Governorate Building", ar: "نهاية شارع الإسكندرية، أمام مبنى محافظة مطروح" },
      { en: "Open-buffet breakfast & dinner", ar: "إفطار وعشاء بوفيه مفتوح" },
      { en: "Round-trip bus from Alexandria", ar: "أتوبيس ذهاب وعودة من الإسكندرية" },
      { en: "Six beaches included", ar: "6 شواطئ ضمن البرنامج" },
    ],
    importantInfo: [
      { en: "Children under 6 years old are free — no additional benefits and no bus seat.", ar: "الأطفال أقل من 6 سنوات مجانًا — بدون أي مميزات إضافية وبدون كرسي في الأتوبيس." },
      {
        en: "Extra bus seat: 800 EGP — includes an external bus seat, an internal bus seat and a beach chair.",
        ar: "كرسي أتوبيس إضافي: 800 جنيه — يشمل كرسي الأتوبيس الخارجي والداخلي وكرسي على الشاطئ.",
      },
    ],
    faq: [],
  },

  // ---------------------------------------------------------------- 4. NEW ROYAL PALACE
  {
    id: "new-royal-palace-marsa-matrouh",
    title: { en: "New Royal Palace Hotel — Marsa Matrouh", ar: "فندق نيو رويال بالاس" },
    destination: { en: "Marsa Matrouh", ar: "مرسى مطروح" },
    destinationId: "marsa-matrouh",
    country: { en: "Egypt", ar: "مصر" },
    categories: ["summer"],
    season: summer2026,
    shortDescription: {
      en: "Directly on the beach at the end of Alexandria Street — every room with a sea view, breakfast buffet and takeaway lunch.",
      ar: "مباشرة على البحر في نهاية شارع الإسكندرية — كل الغرف تطل على البحر، مع بوفيه إفطار وغداء تيك أواي.",
    },
    description: {
      en: "Summer 2026 at New Royal Palace Hotel, at the end of Alexandria Street, directly on the beach and facing the Matrouh Corniche development. All rooms have sea views and ceiling fans; assigned rooms are on the 4th floor. Includes a breakfast buffet at the hotel restaurant, a choice of takeaway lunch, six beaches and a special surprise gift for every family.",
      ar: "صيف 2026 في فندق نيو رويال بالاس، نهاية شارع الإسكندرية مباشرة على البحر وأمام تطوير كورنيش مطروح. جميع الغرف تطل على البحر وبها مراوح سقف، والغرف المخصصة في الدور الرابع. يشمل بوفيه إفطار بمطعم الفندق، واختيارات غداء تيك أواي، و6 شواطئ، وهدية مفاجأة مميزة لكل أسرة.",
    },
    heroImage: images.matrouhCoastPD,
    gallery: [images.matrouhCoastPD, images.matrouhWaterfront, images.fulMedames, images.grilledFish, images.shishTaouk],
    departures: [
      "07-01", "07-05", "07-09", "07-13", "07-17", "07-21", "07-25", "07-29",
      "08-02", "08-06", "08-10", "08-14", "08-18", "08-22", "08-26", "08-30",
      "09-03", "09-07",
    ],
    currency: "EGP",
    priceOptions: [
      { label: seaViewDirect, amount: 4900, kind: "adult", note: perPerson },
      { label: { en: "Side sea view", ar: "جانب مفتوح على البحر" }, amount: 4700, kind: "adult", note: perPerson },
      {
        label: child,
        amount: 3700,
        kind: "child",
        note: { en: "Includes bus seat, beach chair, full bed and full meals", ar: "يشمل كرسي أتوبيس، كرسي على الشاطئ، سرير كامل، ووجبات كاملة" },
      },
    ],
    priceNote: perPerson,
    featured: true,
    services: ["hotel", "meals"],
    included: [
      {
        en: "Breakfast: hotel restaurant buffet — beans, falafel, feta, triangle cheese, white cheese, milk, bread, tea, sugar",
        ar: "الإفطار: بوفيه بمطعم الفندق — فول، فلافل، جبنة فيتا، جبنة مثلثات، جبنة بيضاء، لبن، عيش، شاي، سكر",
      },
      { en: "Takeaway lunch — option 1: half chicken + rice", ar: "غداء تيك أواي — اختيار 1: نصف فرخة + أرز" },
      { en: "Takeaway lunch — option 2: two Denis fish + Tilapia + rice (grilled or fried)", ar: "غداء تيك أواي — اختيار 2: 2 سمكة دنيس + بلطي + أرز (مشوي أو مقلي)" },
      { en: "Takeaway lunch — option 3: Shish Taouk", ar: "غداء تيك أواي — اختيار 3: شيش طاووق" },
      { en: "Takeaway lunch — option 4: kofta with pasta or rice + salads + seasonal fruit", ar: "غداء تيك أواي — اختيار 4: كفتة مع مكرونة أو أرز + سلطات + فاكهة الموسم" },
      matrouhBeaches,
      { en: "A special surprise gift for every family", ar: "هدية مفاجأة مميزة لكل أسرة" },
    ],
    excluded: [],
    itinerary: [],
    highlights: [
      { en: "End of Alexandria Street, directly on the beach", ar: "نهاية شارع الإسكندرية، مباشرة على البحر" },
      { en: "Facing the Matrouh Corniche development", ar: "أمام تطوير كورنيش مطروح" },
      { en: "All rooms have sea views", ar: "جميع الغرف تطل على البحر" },
      { en: "All rooms have ceiling fans", ar: "جميع الغرف بها مراوح سقف" },
      { en: "Assigned rooms are on the 4th floor", ar: "الغرف المخصصة في الدور الرابع" },
    ],
    importantInfo: [
      underSixFree,
      extraBusSeat,
      { en: "Child package includes a bus seat, beach chair, full bed and full meals.", ar: "باقة الطفل تشمل كرسي أتوبيس، كرسي على الشاطئ، سرير كامل، ووجبات كاملة." },
    ],
    faq: [],
  },

  // ---------------------------------------------------------------- 5. DELMAR HOTEL
  {
    id: "delmar-hotel-marsa-matrouh",
    title: { en: "Delmar Hotel — Marsa Matrouh", ar: "فندق دليمار - مرسى مطروح" },
    destination: { en: "Marsa Matrouh", ar: "مرسى مطروح" },
    destinationId: "marsa-matrouh",
    country: { en: "Egypt", ar: "مصر" },
    categories: ["summer"],
    shortDescription: {
      en: "3- and 4-night stays at Delmar Hotel — prices vary by departure date.",
      ar: "إقامة 3 أو 4 ليالٍ في فندق دليمار — الأسعار تختلف حسب موعد السفر.",
    },
    description: {
      en: "Summer coastal trips to Delmar Hotel in Marsa Matrouh, with 3-night and 4-night stays. Prices for adults and children depend on the departure date and length of stay — see the full price schedule below.",
      ar: "رحلات صيفية إلى فندق دليمار في مرسى مطروح، بإقامة 3 أو 4 ليالٍ. تختلف أسعار الكبار والأطفال حسب موعد السفر ومدة الإقامة — راجع جدول الأسعار بالكامل أدناه.",
    },
    heroImage: images.delmarFacade,
    gallery: [images.delmarFacade, images.delmarRoom, images.delmarCafeView, images.matrouhCityShore, images.matrouhTurquoise],
    currency: "EGP",
    pricingSchedule: [
      { dates: ["05-28", "05-31", "06-03", "06-06"], nights: 3, adult: 6500, child: 3500 },
      { dates: ["06-09", "06-16", "06-23"], nights: 3, adult: 6500, child: 3500 },
      { dates: ["06-12", "06-19", "06-26"], nights: 4, adult: 8500, child: 4500 },
      { dates: ["06-30"], nights: 3, adult: 8200, child: 4350 },
      { dates: ["07-03", "07-10", "07-17"], nights: 4, adult: 10750, child: 5600 },
      { dates: ["07-07", "07-14", "07-21"], nights: 3, adult: 8200, child: 4350 },
      { dates: ["07-24"], nights: 4, adult: 10750, child: 5600 },
      { dates: ["07-28", "08-04", "08-11", "08-18", "08-25"], nights: 3, adult: 8200, child: 4350 },
      { dates: ["07-31", "08-07", "08-14", "08-21", "08-28"], nights: 4, adult: 10750, child: 5600 },
      { dates: ["09-01", "09-08", "09-15", "09-22"], nights: 3, adult: 8200, child: 4350 },
      { dates: ["09-04", "09-11", "09-18"], nights: 4, adult: 10750, child: 5600 },
    ],
    featured: true,
    services: ["hotel"],
    included: [],
    excluded: [],
    itinerary: [],
    highlights: [],
    importantInfo: [],
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
