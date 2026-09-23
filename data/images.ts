/**
 * CENTRALIZED IMAGE LIBRARY
 * ------------------------------------------------------------------
 * Every photo on the website is referenced from this file.
 * Files live in /public/images/jeddah-tourism/ (WebP, web-optimized).
 *
 * All photos are REAL photographs from Wikimedia Commons.
 * - Rio Hotel and New Royal Palace Hotel: no verified photos exist, so their
 *   trips use real Marsa Matrouh destination imagery only — never a picture
 *   presented as the hotel itself.
 * - Delmar Hotel: verified photos of the actual hotel are used.
 *
 * Licenses & authors: see public/images/jeddah-tourism/CREDITS.md
 * (CC BY / CC BY-SA photos require attribution to the author).
 *
 * To use the company's own photos, drop them into /public/images/jeddah-tourism/
 * and change the path below — nothing else needs to change.
 */

const img = (path: string) => `/images/jeddah-tourism/${path}.webp`;

export const images = {
  // ---------------- HAJJ — Makkah & Masjid al-Haram
  hajjHero: img("hajj/hajj-hero"), // The Kaaba during Hajj, Masjid al-Haram — CC BY-SA 4.0
  hajjKaabaNight: img("hajj/hajj-kaaba-01"), // Kaaba and pilgrims at night — CC0
  hajjMakkahAerial: img("hajj/hajj-makkah-01"), // Masjid al-Haram and Makkah from above — CC BY-SA 4.0
  hajjPilgrims: img("hajj/hajj-pilgrims-01"), // Pilgrims beginning the Hajj rituals around the Kaaba — CC BY-SA 4.0
  hajjHaramAerialNight: img("hajj/hajj-makkah-02"), // Masjid al-Haram from above at night — CC0
  hajjKaabaEvening: img("hajj/hajj-kaaba-02"), // Kaaba and the mataf in the evening — CC BY-SA 4.0
  hajjKaabaPilgrimsNight: img("hajj/hajj-kaaba-03"), // Pilgrims in the Haram courtyard at night — CC BY-SA 4.0
  // ---------------- UMRAH — Makkah & Madinah
  umrahHero: img("umrah/umrah-hero"), // Al-Masjid an-Nabawi and the Green Dome, Madinah — CC BY 4.0
  umrahKaaba: img("umrah/umrah-makkah"), // Kaaba and Makkah clock tower in daylight — CC0
  umrahNabawiUmbrellas: img("umrah/umrah-masjid-nabawi"), // Courtyard umbrellas of Al-Masjid an-Nabawi — CC BY 4.0
  umrahMadinahNight: img("umrah/umrah-madinah"), // Al-Masjid an-Nabawi at night — CC BY-SA 3.0
  umrahKaabaCourtyard: img("umrah/umrah-makkah-02"), // The mataf courtyard during prayer, Masjid al-Haram — CC BY-SA 4.0
  madinahGreenDome: img("umrah/umrah-green-dome"), // The Green Dome and minarets, Madinah — CC BY-SA 3.0
  madinahGreenDomePortrait: img("umrah/umrah-green-dome-02"), // The Green Dome and a minaret, Madinah — CC BY-SA 4.0
  madinahEvening: img("umrah/umrah-madinah-02"), // Al-Masjid an-Nabawi courtyard in the evening — CC BY 4.0
  madinahDomeMinaret: img("umrah/umrah-madinah-03"), // Green Dome and minaret of Al-Masjid an-Nabawi — Public domain
  // ---------------- SHARED — Makkah
  makkahPilgrimPhotographing: img("shared/pilgrim-journey"), // A pilgrim photographing the Haram — CC BY-SA 4.0
  makkahClockTower: img("shared/makkah-clock-tower"), // Makkah clock tower — CC0
  makkahKaabaDay: img("shared/makkah-kaaba"), // Kaaba and the Haram courtyard by day — CC0
  haramPanoramaSunset: img("shared/masjid-al-haram-panorama"), // Masjid al-Haram at sunset — CC0
  haramPilgrimsRamadan: img("shared/masjid-al-haram-pilgrims"), // Pilgrims in the Haram courtyard — CC BY 4.0
  // ---------------- MARSA MATROUH — destination imagery (all real photos of Marsa Matrouh)
  matrouhHero: img("marsa-matrouh/marsa-matrouh-hero"), // Agiba Beach, Marsa Matrouh — CC BY-SA 4.0
  matrouhAgibaCove: img("marsa-matrouh/marsa-matrouh-agiba-01"), // Agiba Beach cove with beach umbrellas — CC BY-SA 3.0
  matrouhAgibaFlowers: img("marsa-matrouh/marsa-matrouh-agiba-02"), // Agiba Beach with wildflowers — CC BY-SA 3.0
  matrouhAgibaSwimmers: img("marsa-matrouh/marsa-matrouh-agiba-03"), // Swimmers at Agiba Beach — CC BY-SA 4.0
  matrouhAgibaTall: img("marsa-matrouh/marsa-matrouh-agiba-04"), // Clear water at Agiba Beach — CC BY-SA 4.0
  matrouhAgibaCliffs: img("marsa-matrouh/marsa-matrouh-agiba-05"), // Agiba Beach cliffs — CC BY-SA 4.0
  matrouhFayrouzSunset: img("marsa-matrouh/marsa-matrouh-fayrouz-sunset"), // Sunset at Al-Fayrouz Beach — CC BY-SA 4.0
  matrouhCleopatraBath: img("marsa-matrouh/marsa-matrouh-cleopatra-01"), // Cleopatra Beach, Marsa Matrouh — CC BY-SA 4.0
  matrouhCleopatraBath2: img("marsa-matrouh/marsa-matrouh-cleopatra-02"), // Cleopatra's Bath rock, Cleopatra Beach — CC BY-SA 4.0
  matrouhCleopatraFamilies: img("marsa-matrouh/marsa-matrouh-cleopatra-03"), // Visitors at Cleopatra Beach — CC BY-SA 4.0
  matrouhCleopatraRock: img("marsa-matrouh/marsa-matrouh-cleopatra-04"), // Rock formation at Cleopatra Beach — CC BY-SA 4.0
  matrouhCleopatraClear: img("marsa-matrouh/marsa-matrouh-cleopatra-05"), // Clear shallow water at Cleopatra Beach — CC BY-SA 3.0
  matrouhObayed: img("marsa-matrouh/marsa-matrouh-obayed"), // Al-Obayed Beach, Marsa Matrouh — CC BY-SA 4.0
  matrouhRommel: img("marsa-matrouh/marsa-matrouh-rommel"), // Rommel Beach, Marsa Matrouh — CC BY-SA 4.0
  matrouhBeachChairs: img("marsa-matrouh/marsa-matrouh-beach-chairs"), // Beach umbrellas and chairs in Marsa Matrouh — CC BY-SA 4.0
  matrouhCityBay: img("marsa-matrouh/marsa-matrouh-bay"), // Marsa Matrouh bay and city — CC BY-SA 3.0
  matrouhCityBeach: img("marsa-matrouh/marsa-matrouh-city-beach"), // City beach in Marsa Matrouh — Public domain
  matrouhCoastPD: img("marsa-matrouh/marsa-matrouh-coast"), // Marsa Matrouh coastline — Public domain
  matrouhWaterfront: img("marsa-matrouh/marsa-matrouh-waterfront"), // Marsa Matrouh waterfront and corniche — Public domain
  matrouhRockySea: img("marsa-matrouh/marsa-matrouh-rocky-sea"), // Rocky Mediterranean shore, Marsa Matrouh — CC BY-SA 4.0
  matrouhTurquoise: img("marsa-matrouh/marsa-matrouh-turquoise"), // Turquoise Mediterranean water, Marsa Matrouh — CC BY-SA 4.0
  matrouhCityShore: img("marsa-matrouh/marsa-matrouh-shore"), // Shoreline of Marsa Matrouh — CC BY-SA 3.0
  // ---------------- DELMAR HOTEL — verified photos of the actual hotel
  delmarFacade: img("delmar/delmar-hero"), // Delmar Hotel sea-facing facade (verified photo of the hotel) — CC BY-SA 4.0
  delmarRoom: img("delmar/delmar-room"), // Sea-view room at Delmar Hotel (verified photo of the hotel) — CC BY-SA 4.0
  delmarCafeView: img("delmar/delmar-cafe-sea-view"), // Sea view from the Delmar Hotel café (verified photo of the hotel) — CC BY-SA 4.0
  // ---------------- FOOD — generic Egyptian hotel/buffet food (not a specific hotel's food)
  buffetBreakfast: img("shared/food-breakfast-buffet"), // Egyptian hotel breakfast buffet (generic) — CC0
  buffetHotDishes: img("shared/food-buffet-dishes"), // Hot dishes at a hotel buffet (generic) — CC0
  fulMedames: img("shared/food-ful-medames"), // Egyptian breakfast plate — ful, eggs and bread (generic) — CC0
  shishTaouk: img("shared/food-shish-taouk"), // Shish taouk with rice (generic) — CC0
  grilledFish: img("shared/food-grilled-fish"), // Grilled fish with rice (generic) — CC BY 2.0
  koftaPlate: img("shared/food-kofta"), // Kofta and kebab with salad (generic) — CC0
} as const;

export type ImageKey = keyof typeof images;
